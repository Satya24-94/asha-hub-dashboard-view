
export type UserRole = 'asha' | 'asha_facilitator' | 'admin';

export interface Profile {
  id: string;
  full_name: string | null;
  role: string | null;
  phone: string | null;
  village: string | null;
  block: string | null;
  district: string | null;
  state: string | null;
  facilitator_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaternalHealthIndicators {
  id: string;
  asha_id: string;
  month: number;
  year: number;
  pregnant_women_registered: number;
  pregnant_women_3_anc: number;
  pregnant_women_tt2: number;
  pregnant_women_100_ifa: number;
  institutional_deliveries: number;
  home_deliveries_sba: number;
  maternal_complications: number;
  women_referred_complications: number;
  maternal_deaths: number;
  created_at: string;
  updated_at: string;
}

export interface ChildHealthIndicators {
  id: string;
  asha_id: string;
  month: number;
  year: number;
  live_births: number;
  children_12_23_fully_immunized: number;
  newborns_breastfed_1hr: number;
  children_exclusively_breastfed_6m: number;
  children_6_9m_solid_food: number;
  neonatal_deaths: number;
  infant_deaths: number;
  created_at: string;
  updated_at: string;
}

export interface ReferralTracking {
  id: string;
  asha_id: string;
  month: number;
  year: number;
  neonates_complications_total: number;
  neonates_complications_referred: number;
  children_diarrhea_total: number;
  children_diarrhea_ors: number;
  children_diarrhea_treatment: number;
  children_diarrhea_hospitalized: number;
  children_ari_fever_total: number;
  children_ari_fever_treatment: number;
  children_ari_fever_hospitalized: number;
  created_at: string;
  updated_at: string;
}

export interface AshaFunctionality {
  id: string;
  asha_id: string;
  month: number;
  year: number;
  newborn_visit_1st_day: boolean;
  home_visits_newborn_care: boolean;
  vhnd_attendance: boolean;
  institutional_delivery_support: boolean;
  childhood_illness_management: boolean;
  nutrition_counseling: boolean;
  malaria_fever_management: boolean;
  dots_provision: boolean;
  vhsnc_meeting_attendance: boolean;
  referral_sterilization_services: boolean;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export interface Targets {
  id: string;
  block: string;
  month: number;
  year: number;
  target_pregnant_women: number;
  target_live_births: number;
  target_children_12_23m: number;
  created_at: string;
}
