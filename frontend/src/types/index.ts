import { z } from "zod";
import {
  loginSchema,
  registerSchema,
  groupSchema,
  urlshortenerSchema,
  domainSchema,
} from "@/lib/zod";
import { ChipProps } from "@heroui/react";

// Form types
export type LoginForm = z.infer<typeof loginSchema>;

export type RegisterForm = z.infer<typeof registerSchema>;

export type GroupForm = z.infer<typeof groupSchema>;

export type URLForm = z.infer<typeof urlshortenerSchema>;

export type DomainForm = z.infer<typeof domainSchema>;

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

export type GroupResponse = {
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

export type URLRequest = {
  url: string;
  group: string;
  privacy: string;
  password: string;
};

export type URLWriteMinimal = {
  url: string;
};

export type ClickResponse = {
  id: number;
  url: string;
  ip_address: string;
  device: string;
  browser: string;
  os: string;
  created_at: string;
};

export type ClickDate = {
  date: string;
  clicks: number;
};

export type ClickType = {
  name: string;
  clicks: number;
};

export type DomainResponse = {
  id: string;
  domain: string;
  status: string;
  created_at: string;
};

export type DomainRequest = {
  domain: string;
};

export type FeatureResponse = {
  id: number;
  name: string;
  quantity: number;
  is_active: boolean;
};

export type PlanResponse = {
  id: string;
  name: string;
  description: string;
  price_monthly: string;
  price_annual: string;
  discount_annual: string;
  checkout_url: string;
  links_per_month: number;
  api_links_per_month: number;
  link_lifetime: string;
  analytics_duration: string;
  plan_features: FeatureResponse[];
  is_test_mode: boolean;
};

// UI

export type Filters = {
  category: string;
  sortBy: "newest" | "oldest" | "popular" | "name" | "";
  search: string;
};

export type TableColumn = {
  uid: string;
  name: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
};

export type FilterOption = {
  uid: string;
  name: string;
};

export type TableAction<T> = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  color?: ChipProps["color"];
  shortcut?: string;
  onAction?: (item: T) => void;
};

export type CellRendererProps<T> = {
  item: T;
  columnKey: string;
  value: any;
};
