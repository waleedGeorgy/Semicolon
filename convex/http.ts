import stripe from "../app/lib/stripe";
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

const http = httpRouter();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, svix-id, svix-timestamp, svix-signature",
};

http.route({
  path: "/clerk-webhook",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }),
});

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const whSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!whSecret) throw new Error("A webhook secret was not provided");

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Error. No SVIX headers", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(whSecret);
    let event: WebhookEvent;

    try {
      event = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as WebhookEvent;
    } catch (error) {
      console.log("Error verifying the webhook", error);
      return new Response("An error occurred", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const eventType = event.type;
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = event.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`;

      try {
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        });
      } catch (error) {
        console.log("Error creating a user", error);
        return new Response("Error creating user", {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    return new Response("Webhook processed successfully", {
      status: 200,
      headers: corsHeaders,
    });
  }),
});

http.route({
  path: "/stripe-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      console.error(`Webhook signature verification failed:`, error.message);
      return new Response(
        JSON.stringify({ error: `Webhook Error: ${error.message}` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      switch (event.type) {
        case "checkout.session.completed":
          await handleCheckoutSessionCompleted(ctx, event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return new Response(
        JSON.stringify({ error: "Webhook processing failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

async function handleCheckoutSessionCompleted(ctx: any, session: any) {
  const { userId } = session.metadata;

  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    console.log("Error in handle checkout session");
    throw new Error("User not found in session metadata");
  }

  if (session.payment_status !== "paid") {
    console.log(
      `Payment status is ${session.payment_status}, not updating user`
    );
    return;
  }

  // Use Convex mutation to update the user
  await ctx.runMutation(api.users.updateToPro, {
    userId,
    stripeCustomerId: session.customer as string,
    stripeOrderId: session.id,
  });

  console.log(`Successfully upgraded user ${userId} to Pro`);
}

export default http;
