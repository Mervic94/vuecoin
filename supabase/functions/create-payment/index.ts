
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentification utilisateur Supabase (token)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabase.auth.getUser(token);

    if (!user?.email || !user?.id) {
      return new Response(JSON.stringify({ error: "Utilisateur non authentifié" }), {
        headers: corsHeaders,
        status: 401,
      });
    }

    const { amount } = await req.json();
    if (!amount || typeof amount !== "number" || isNaN(amount)) {
      return new Response(JSON.stringify({ error: "Montant invalide" }), {
        headers: corsHeaders,
        status: 400,
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-01",
    });

    // On cherche un client Stripe existant pour cet utilisateur
    const existing = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId = existing.data?.[0]?.id;
    if (!customerId) {
      // Crée le client Stripe si nécessaire
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_id: user.id },
      });
      customerId = customer.id;
    }

    // Création de la session Checkout
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "Dépôt VueCoin" },
            unit_amount: Math.round(amount * 100), // en centimes
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/funding?success=1`,
      cancel_url: `${req.headers.get("origin")}/funding?canceled=1`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
