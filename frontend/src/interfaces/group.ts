export interface GroupRead {
  id: string;
  name: string;
  alias: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_available: boolean;
}

export interface GroupWrite {
  name: string;
  description: string;
}
