import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    if (userId) {
      try {
        const convex = new ConvexHttpClient(
          process.env.NEXT_PUBLIC_CONVEX_URL!
        );
        await convex.mutation(api.users.setPro, { userId });
      } catch (err) {
        // Optionally log the error
        return NextResponse.json(
          { error: "Failed to update user status" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "No userId in session metadata" },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
