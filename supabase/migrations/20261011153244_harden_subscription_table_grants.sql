-- Staging security hardening: expose read-only subscription data through RLS only.
-- REVOKE ALL also removes TRUNCATE, TRIGGER, and REFERENCES privileges which RLS does not constrain.
REVOKE ALL ON TABLE public.subscription_plans, public.subscriptions FROM anon, authenticated;
GRANT SELECT ON TABLE public.subscription_plans TO anon, authenticated;
GRANT SELECT ON TABLE public.subscriptions TO authenticated;
