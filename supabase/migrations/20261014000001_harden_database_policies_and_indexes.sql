-- Performance hardening: index foreign keys and avoid per-row auth.uid() evaluation.
CREATE INDEX IF NOT EXISTS subscriptions_plan_id_idx ON public.subscriptions (plan_id);
CREATE INDEX IF NOT EXISTS user_access_grants_granted_by_idx ON public.user_access_grants (granted_by);
CREATE INDEX IF NOT EXISTS user_access_grants_revoked_by_idx ON public.user_access_grants (revoked_by);

DROP POLICY IF EXISTS "Users can read own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can read own subscriptions"
  ON public.subscriptions FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);
