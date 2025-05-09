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
      block: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by: string | null
          id: number
          page_id: number | null
          parent_id: number
          properties: Json | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          page_id?: number | null
          parent_id: number
          properties?: Json | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          page_id?: number | null
          parent_id?: number
          properties?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "block_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "page"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "block_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "block"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "block_parent_id_fkey1"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "page"
            referencedColumns: ["id"]
          },
        ]
      }
      content_in_block: {
        Row: {
          block_id: number
          content_arr_idx: number | null
          content_id: number
          page_id: number
        }
        Insert: {
          block_id: number
          content_arr_idx?: number | null
          content_id: number
          page_id: number
        }
        Update: {
          block_id?: number
          content_arr_idx?: number | null
          content_id?: number
          page_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_in_block_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "block"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_in_block_block_id_fkey1"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "page"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_in_block_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "block"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_in_block_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "page"
            referencedColumns: ["id"]
          },
        ]
      }
      page: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: number
          project_id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: number
          project_id: number
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: number
          project_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      page_in_project: {
        Row: {
          page_id: number
          project_id: number
        }
        Insert: {
          page_id: number
          project_id: number
        }
        Update: {
          page_id?: number
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "page_in_project_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "page"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_in_project_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bulk_update_blocks: {
        Args: { input: Json } | { input: Json }
        Returns: undefined
      }
      find_child_in_temp: {
        Args: { block_id: number; arr: number[] }
        Returns: Record<string, unknown>[]
      }
      get_page_list: {
        Args: { project_id: number }
        Returns: {
          created_at: string | null
          created_by: string | null
          id: number
          project_id: number
          title: string
        }[]
      }
      get_relation: {
        Args: { page_id: number }
        Returns: {
          block_id: number
          content_arr_idx: number | null
          content_id: number
          page_id: number
        }[]
      }
      get_result: {
        Args: Record<PropertyKey, never> | { page_id: number }
        Returns: Record<string, unknown>[]
      }
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
