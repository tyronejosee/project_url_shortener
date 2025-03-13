export interface URLRead {
  id: string;
  url: string;
  alias: string;
  group: string;
  privacy: string;
  created_at: string;
  updated_at: string;
}

export interface URLWrite {
  url: string;
  group: string;
  privacy: string;
  password: string;
}

export interface URLWriteMinimal {
  url: string;
}
