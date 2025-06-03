export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      asha_functionality: {
        Row: {
          asha_id: string
          childhood_illness_management: boolean | null
          created_at: string | null
          dots_provision: boolean | null
          home_visits_newborn_care: boolean | null
          id: string
          institutional_delivery_support: boolean | null
          malaria_fever_management: boolean | null
          month: number
          newborn_visit_1st_day: boolean | null
          nutrition_counseling: boolean | null
          referral_sterilization_services: boolean | null
          remarks: string | null
          updated_at: string | null
          vhnd_attendance: boolean | null
          vhsnc_meeting_attendance: boolean | null
          year: number
        }
        Insert: {
          asha_id: string
          childhood_illness_management?: boolean | null
          created_at?: string | null
          dots_provision?: boolean | null
          home_visits_newborn_care?: boolean | null
          id?: string
          institutional_delivery_support?: boolean | null
          malaria_fever_management?: boolean | null
          month: number
          newborn_visit_1st_day?: boolean | null
          nutrition_counseling?: boolean | null
          referral_sterilization_services?: boolean | null
          remarks?: string | null
          updated_at?: string | null
          vhnd_attendance?: boolean | null
          vhsnc_meeting_attendance?: boolean | null
          year: number
        }
        Update: {
          asha_id?: string
          childhood_illness_management?: boolean | null
          created_at?: string | null
          dots_provision?: boolean | null
          home_visits_newborn_care?: boolean | null
          id?: string
          institutional_delivery_support?: boolean | null
          malaria_fever_management?: boolean | null
          month?: number
          newborn_visit_1st_day?: boolean | null
          nutrition_counseling?: boolean | null
          referral_sterilization_services?: boolean | null
          remarks?: string | null
          updated_at?: string | null
          vhnd_attendance?: boolean | null
          vhsnc_meeting_attendance?: boolean | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "asha_functionality_asha_id_fkey"
            columns: ["asha_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      child_health_indicators: {
        Row: {
          asha_id: string
          children_12_23_fully_immunized: number | null
          children_6_9m_solid_food: number | null
          children_exclusively_breastfed_6m: number | null
          created_at: string | null
          id: string
          infant_deaths: number | null
          live_births: number | null
          month: number
          neonatal_deaths: number | null
          newborns_breastfed_1hr: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          asha_id: string
          children_12_23_fully_immunized?: number | null
          children_6_9m_solid_food?: number | null
          children_exclusively_breastfed_6m?: number | null
          created_at?: string | null
          id?: string
          infant_deaths?: number | null
          live_births?: number | null
          month: number
          neonatal_deaths?: number | null
          newborns_breastfed_1hr?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          asha_id?: string
          children_12_23_fully_immunized?: number | null
          children_6_9m_solid_food?: number | null
          children_exclusively_breastfed_6m?: number | null
          created_at?: string | null
          id?: string
          infant_deaths?: number | null
          live_births?: number | null
          month?: number
          neonatal_deaths?: number | null
          newborns_breastfed_1hr?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "child_health_indicators_asha_id_fkey"
            columns: ["asha_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maternal_health_indicators: {
        Row: {
          asha_id: string
          created_at: string | null
          home_deliveries_sba: number | null
          id: string
          institutional_deliveries: number | null
          maternal_complications: number | null
          maternal_deaths: number | null
          month: number
          pregnant_women_100_ifa: number | null
          pregnant_women_3_anc: number | null
          pregnant_women_registered: number | null
          pregnant_women_tt2: number | null
          updated_at: string | null
          women_referred_complications: number | null
          year: number
        }
        Insert: {
          asha_id: string
          created_at?: string | null
          home_deliveries_sba?: number | null
          id?: string
          institutional_deliveries?: number | null
          maternal_complications?: number | null
          maternal_deaths?: number | null
          month: number
          pregnant_women_100_ifa?: number | null
          pregnant_women_3_anc?: number | null
          pregnant_women_registered?: number | null
          pregnant_women_tt2?: number | null
          updated_at?: string | null
          women_referred_complications?: number | null
          year: number
        }
        Update: {
          asha_id?: string
          created_at?: string | null
          home_deliveries_sba?: number | null
          id?: string
          institutional_deliveries?: number | null
          maternal_complications?: number | null
          maternal_deaths?: number | null
          month?: number
          pregnant_women_100_ifa?: number | null
          pregnant_women_3_anc?: number | null
          pregnant_women_registered?: number | null
          pregnant_women_tt2?: number | null
          updated_at?: string | null
          women_referred_complications?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "maternal_health_indicators_asha_id_fkey"
            columns: ["asha_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          block: string | null
          created_at: string | null
          district: string | null
          facilitator_id: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          state: string | null
          updated_at: string | null
          village: string | null
        }
        Insert: {
          block?: string | null
          created_at?: string | null
          district?: string | null
          facilitator_id?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          state?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          block?: string | null
          created_at?: string | null
          district?: string | null
          facilitator_id?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          state?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_facilitator_id_fkey"
            columns: ["facilitator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_tracking: {
        Row: {
          asha_id: string
          children_ari_fever_hospitalized: number | null
          children_ari_fever_total: number | null
          children_ari_fever_treatment: number | null
          children_diarrhea_hospitalized: number | null
          children_diarrhea_ors: number | null
          children_diarrhea_total: number | null
          children_diarrhea_treatment: number | null
          created_at: string | null
          id: string
          month: number
          neonates_complications_referred: number | null
          neonates_complications_total: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          asha_id: string
          children_ari_fever_hospitalized?: number | null
          children_ari_fever_total?: number | null
          children_ari_fever_treatment?: number | null
          children_diarrhea_hospitalized?: number | null
          children_diarrhea_ors?: number | null
          children_diarrhea_total?: number | null
          children_diarrhea_treatment?: number | null
          created_at?: string | null
          id?: string
          month: number
          neonates_complications_referred?: number | null
          neonates_complications_total?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          asha_id?: string
          children_ari_fever_hospitalized?: number | null
          children_ari_fever_total?: number | null
          children_ari_fever_treatment?: number | null
          children_diarrhea_hospitalized?: number | null
          children_diarrhea_ors?: number | null
          children_diarrhea_total?: number | null
          children_diarrhea_treatment?: number | null
          created_at?: string | null
          id?: string
          month?: number
          neonates_complications_referred?: number | null
          neonates_complications_total?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "referral_tracking_asha_id_fkey"
            columns: ["asha_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      targets: {
        Row: {
          block: string
          created_at: string | null
          id: string
          month: number
          target_children_12_23m: number | null
          target_live_births: number | null
          target_pregnant_women: number | null
          year: number
        }
        Insert: {
          block: string
          created_at?: string | null
          id?: string
          month: number
          target_children_12_23m?: number | null
          target_live_births?: number | null
          target_pregnant_women?: number | null
          year: number
        }
        Update: {
          block?: string
          created_at?: string | null
          id?: string
          month?: number
          target_children_12_23m?: number | null
          target_live_births?: number | null
          target_pregnant_women?: number | null
          year?: number
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      user_role: "asha" | "asha_facilitator" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["asha", "asha_facilitator", "admin"],
    },
  },
} as const
