CREATE TABLE public.booking_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  guests integer NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.booking_enquiries TO service_role;

ALTER TABLE public.booking_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages booking enquiries"
  ON public.booking_enquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);