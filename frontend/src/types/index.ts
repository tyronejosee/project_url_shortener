// Form types
export type LoginForm = {
  email: string;
  password: string;
};

export type URLForm = {
  url: string;
};

export type FeedbackForm = {
  name: string;
  email: string;
  message: string;
};

export type SupportForm = {
  name: string;
  email: string;
  message: string;
};

// API types
export type User = {
  id: string;
  email: string;
  username: string;
  slug: string;
  plan: string;
  is_active: boolean;
  is_staff: boolean;
};

export type GroupRead = {
  id: string;
  name: string;
  alias: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_available: boolean;
};

export type GroupWrite = {
  name: string;
  description: string;
};

export type URLRead = {
  id: string;
  url: string;
  alias: string;
  group: string;
  privacy: string;
  created_at: string;
  updated_at: string;
};

export type URLWrite = {
  url: string;
  group: string;
  privacy: string;
  password: string;
};

export type URLWriteMinimal = {
  url: string;
};

export type ClickDate = {
  date: string;
  clicks: number;
};

export type ClickType = {
  name: string;
  clicks: number;
};
