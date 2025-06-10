
-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Recreate RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Drop and recreate policies for health indicator tables
DROP POLICY IF EXISTS "Users can view their own maternal health data" ON public.maternal_health_indicators;
DROP POLICY IF EXISTS "Users can insert their own maternal health data" ON public.maternal_health_indicators;
DROP POLICY IF EXISTS "Users can update their own maternal health data" ON public.maternal_health_indicators;

CREATE POLICY "Users can view their own maternal health data" ON public.maternal_health_indicators
  FOR SELECT USING (auth.uid() = asha_id);

CREATE POLICY "Users can insert their own maternal health data" ON public.maternal_health_indicators
  FOR INSERT WITH CHECK (auth.uid() = asha_id);

CREATE POLICY "Users can update their own maternal health data" ON public.maternal_health_indicators
  FOR UPDATE USING (auth.uid() = asha_id);

-- Similar for other tables
DROP POLICY IF EXISTS "Users can view their own child health data" ON public.child_health_indicators;
DROP POLICY IF EXISTS "Users can insert their own child health data" ON public.child_health_indicators;
DROP POLICY IF EXISTS "Users can update their own child health data" ON public.child_health_indicators;

CREATE POLICY "Users can view their own child health data" ON public.child_health_indicators
  FOR SELECT USING (auth.uid() = asha_id);

CREATE POLICY "Users can insert their own child health data" ON public.child_health_indicators
  FOR INSERT WITH CHECK (auth.uid() = asha_id);

CREATE POLICY "Users can update their own child health data" ON public.child_health_indicators
  FOR UPDATE USING (auth.uid() = asha_id);

DROP POLICY IF EXISTS "Users can view their own referral data" ON public.referral_tracking;
DROP POLICY IF EXISTS "Users can insert their own referral data" ON public.referral_tracking;
DROP POLICY IF EXISTS "Users can update their own referral data" ON public.referral_tracking;

CREATE POLICY "Users can view their own referral data" ON public.referral_tracking
  FOR SELECT USING (auth.uid() = asha_id);

CREATE POLICY "Users can insert their own referral data" ON public.referral_tracking
  FOR INSERT WITH CHECK (auth.uid() = asha_id);

CREATE POLICY "Users can update their own referral data" ON public.referral_tracking
  FOR UPDATE USING (auth.uid() = asha_id);

DROP POLICY IF EXISTS "Users can view their own functionality data" ON public.asha_functionality;
DROP POLICY IF EXISTS "Users can insert their own functionality data" ON public.asha_functionality;
DROP POLICY IF EXISTS "Users can update their own functionality data" ON public.asha_functionality;

CREATE POLICY "Users can view their own functionality data" ON public.asha_functionality
  FOR SELECT USING (auth.uid() = asha_id);

CREATE POLICY "Users can insert their own functionality data" ON public.asha_functionality
  FOR INSERT WITH CHECK (auth.uid() = asha_id);

CREATE POLICY "Users can update their own functionality data" ON public.asha_functionality
  FOR UPDATE USING (auth.uid() = asha_id);
