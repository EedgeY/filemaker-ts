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
      farms: {
        Row: {
          address: string | null
          billing_address: string | null
          billing_contact_name: string | null
          billing_department: string | null
          billing_name: string | null
          billing_postcode: string | null
          billing_type: Database["public"]["Enums"]["billing_type"]
          created_at: string
          due_date_days: number | null
          email: string | null
          farm_code: string
          fax: string | null
          insemination_fee: number | null
          insemination_fee_type: Database["public"]["Enums"]["fee_type"]
          insemination_inspection: boolean | null
          name: string
          postcode: string | null
          pregnancy_check_days: number | null
          transplant_fee_type: Database["public"]["Enums"]["fee_type"]
          updated_at: string
          vaccine_program: boolean | null
        }
        Insert: {
          address?: string | null
          billing_address?: string | null
          billing_contact_name?: string | null
          billing_department?: string | null
          billing_name?: string | null
          billing_postcode?: string | null
          billing_type?: Database["public"]["Enums"]["billing_type"]
          created_at?: string
          due_date_days?: number | null
          email?: string | null
          farm_code: string
          fax?: string | null
          insemination_fee?: number | null
          insemination_fee_type?: Database["public"]["Enums"]["fee_type"]
          insemination_inspection?: boolean | null
          name: string
          postcode?: string | null
          pregnancy_check_days?: number | null
          transplant_fee_type?: Database["public"]["Enums"]["fee_type"]
          updated_at?: string
          vaccine_program?: boolean | null
        }
        Update: {
          address?: string | null
          billing_address?: string | null
          billing_contact_name?: string | null
          billing_department?: string | null
          billing_name?: string | null
          billing_postcode?: string | null
          billing_type?: Database["public"]["Enums"]["billing_type"]
          created_at?: string
          due_date_days?: number | null
          email?: string | null
          farm_code?: string
          fax?: string | null
          insemination_fee?: number | null
          insemination_fee_type?: Database["public"]["Enums"]["fee_type"]
          insemination_inspection?: boolean | null
          name?: string
          postcode?: string | null
          pregnancy_check_days?: number | null
          transplant_fee_type?: Database["public"]["Enums"]["fee_type"]
          updated_at?: string
          vaccine_program?: boolean | null
        }
        Relationships: []
      }
      owners: {
        Row: {
          address: string | null
          all_season_price: number | null
          carf_price: number | null
          cattle_price: number | null
          dehorning_price: number | null
          delete_flag: boolean | null
          desired_before_calving_age_month: number | null
          desired_insemination_age_month: number | null
          farm_code: string
          farm_id: string
          fax: string | null
          furikana: string | null
          hidden: boolean | null
          id: number
          mail: string | null
          name: string | null
          owner_name: string | null
          phone: string | null
          postcode: string | null
          return_days: number | null
          summer_price: number | null
          tel: string | null
          uuid: string
          winter_price: number | null
        }
        Insert: {
          address?: string | null
          all_season_price?: number | null
          carf_price?: number | null
          cattle_price?: number | null
          dehorning_price?: number | null
          delete_flag?: boolean | null
          desired_before_calving_age_month?: number | null
          desired_insemination_age_month?: number | null
          farm_code: string
          farm_id: string
          fax?: string | null
          furikana?: string | null
          hidden?: boolean | null
          id: number
          mail?: string | null
          name?: string | null
          owner_name?: string | null
          phone?: string | null
          postcode?: string | null
          return_days?: number | null
          summer_price?: number | null
          tel?: string | null
          uuid: string
          winter_price?: number | null
        }
        Update: {
          address?: string | null
          all_season_price?: number | null
          carf_price?: number | null
          cattle_price?: number | null
          dehorning_price?: number | null
          delete_flag?: boolean | null
          desired_before_calving_age_month?: number | null
          desired_insemination_age_month?: number | null
          farm_code?: string
          farm_id?: string
          fax?: string | null
          furikana?: string | null
          hidden?: boolean | null
          id?: number
          mail?: string | null
          name?: string | null
          owner_name?: string | null
          phone?: string | null
          postcode?: string | null
          return_days?: number | null
          summer_price?: number | null
          tel?: string | null
          uuid?: string
          winter_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "owners_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["farm_code"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          farm_code: string
          id: number
          name: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          farm_code: string
          id?: never
          name?: string | null
          role?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          farm_code?: string
          id?: never
          name?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_farm_id_fkey"
            columns: ["farm_code"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["farm_code"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      billing_type: "annual" | "seasonal" | "age_based"
      fee_type: "none" | "first_time_only" | "every_time"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

