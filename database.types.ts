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
      posts: {
        Row: {
          content: string
          created_at: string | null
          id: number
          reply_ids: number[] | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          reply_ids?: number[] | null
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          reply_ids?: number[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      reactions: {
        Row: {
          created_at: string | null
          id: number
          post_id: number | null
          reaction_type: string
          reply_id: number | null
          repost_id: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          reaction_type: string
          reply_id?: number | null
          repost_id?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          reaction_type?: string
          reply_id?: number | null
          repost_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_repost_id_fkey"
            columns: ["repost_id"]
            isOneToOne: false
            referencedRelation: "reposts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      replies: {
        Row: {
          content: string
          created_at: string | null
          id: number
          parent_reply_id: number | null
          post_id: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          parent_reply_id?: number | null
          post_id?: number | null
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          parent_reply_id?: number | null
          post_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "replies_parent_reply_id_fkey"
            columns: ["parent_reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      reposts: {
        Row: {
          created_at: string | null
          id: number
          post_id: number | null
          reply_id: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          reply_id?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: never
          post_id?: number | null
          reply_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reposts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reposts_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reposts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      user_followers: {
        Row: {
          follower_id: string
          user_id: string
        }
        Insert: {
          follower_id?: string
          user_id?: string
        }
        Update: {
          follower_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_followers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["clerk_user_id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          clerk_user_id: string
          display_name: string
          id: number
          image_url: string | null
          join_date: string | null
          location: string | null
          username: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          clerk_user_id?: string
          display_name: string
          id?: never
          image_url?: string | null
          join_date?: string | null
          location?: string | null
          username: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          clerk_user_id?: string
          display_name?: string
          id?: never
          image_url?: string | null
          join_date?: string | null
          location?: string | null
          username?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
