export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      horoscope: {
        Row: {
          created_at: string
          date: string
          id: string
          lucky_color: string | null
          lucky_number: number | null
          prediction: string
          sign: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          lucky_color?: string | null
          lucky_number?: number | null
          prediction: string
          sign: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          lucky_color?: string | null
          lucky_number?: number | null
          prediction?: string
          sign?: string
        }
        Relationships: []
      }
      photocard_templates: {
        Row: {
          created_at: string
          created_by: string
          id: string
          is_public: boolean
          name: string
          preview_url: string | null
          template_data: Json
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          is_public?: boolean
          name: string
          preview_url?: string | null
          template_data: Json
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          is_public?: boolean
          name?: string
          preview_url?: string | null
          template_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "photocard_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string
          category: Database["public"]["Enums"]["category_type"]
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          status: Database["public"]["Enums"]["post_status"]
          subcategory: string | null
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id: string
          category: Database["public"]["Enums"]["category_type"]
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          subcategory?: string | null
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string
          category?: Database["public"]["Enums"]["category_type"]
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          subcategory?: string | null
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_times: {
        Row: {
          asr: string
          created_at: string
          dhuhr: string
          fajr: string
          id: string
          is_active: boolean
          isha: string
          location: string
          maghrib: string
          updated_at: string
        }
        Insert: {
          asr: string
          created_at?: string
          dhuhr: string
          fajr: string
          id?: string
          is_active?: boolean
          isha: string
          location?: string
          maghrib: string
          updated_at?: string
        }
        Update: {
          asr?: string
          created_at?: string
          dhuhr?: string
          fajr?: string
          id?: string
          is_active?: boolean
          isha?: string
          location?: string
          maghrib?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reporter_cards: {
        Row: {
          card_number: string
          created_at: string
          designation: string
          district: string | null
          expiry_date: string | null
          id: string
          issue_date: string
          qr_code_data: string
          upazila: string | null
          user_id: string
        }
        Insert: {
          card_number: string
          created_at?: string
          designation: string
          district?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string
          qr_code_data: string
          upazila?: string | null
          user_id: string
        }
        Update: {
          card_number?: string
          created_at?: string
          designation?: string
          district?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string
          qr_code_data?: string
          upazila?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reporter_cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      special_content: {
        Row: {
          content: string
          content_type: string
          created_at: string
          created_by: string | null
          date: string | null
          id: string
          image_url: string | null
          is_active: boolean
          source_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string
          created_by?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          source_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          created_by?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          source_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "special_content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      watermarks: {
        Row: {
          created_at: string
          created_by: string
          id: string
          image_url: string
          is_default: boolean
          name: string
          opacity: number
          position: string
          size: number
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          image_url: string
          is_default?: boolean
          name: string
          opacity?: number
          position?: string
          size?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          image_url?: string
          is_default?: boolean
          name?: string
          opacity?: number
          position?: string
          size?: number
        }
        Relationships: [
          {
            foreignKeyName: "watermarks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "reporter" | "user"
      category_type:
        | "national"
        | "politics"
        | "world"
        | "sports"
        | "entertainment"
        | "lifestyle"
        | "opinion"
        | "photo"
        | "video"
      post_status: "draft" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "reporter", "user"],
      category_type: [
        "national",
        "politics",
        "world",
        "sports",
        "entertainment",
        "lifestyle",
        "opinion",
        "photo",
        "video",
      ],
      post_status: ["draft", "published", "archived"],
    },
  },
} as const
