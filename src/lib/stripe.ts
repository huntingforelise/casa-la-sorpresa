import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export const hasStripeConfig = () => Boolean(process.env.STRIPE_SECRET_KEY);

export const getStripe = () => {
  if (!hasStripeConfig()) return null;

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-05-27.dahlia",
      typescript: true,
    });
  }

  return stripeClient;
};
