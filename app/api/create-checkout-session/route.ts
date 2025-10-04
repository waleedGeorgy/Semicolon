// app/api/create-checkout-session/route.ts
import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return NextResponse.json(
      { error: "Invalid or missing User ID." },
      { status: 400 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile?pro=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
    metadata: { userId },
  });

  return NextResponse.json({ url: session.url });
}
