
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  EMAIL_LISTS = 'EMAIL_LISTS',
  ACCOUNTS = 'ACCOUNTS',
  CAMPAIGNS = 'CAMPAIGNS',
  ANALYTICS = 'ANALYTICS',
  INTELLIGENCE = 'INTELLIGENCE',
  CREATIVE = 'CREATIVE',
  VOICE = 'VOICE',
}

export interface Stat {
  label: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
}

export interface ContactList {
  id: string;
  name: string;
  contacts: number;
  quality: number;
  openRate: number;
  status: 'active' | 'poor' | 'processing';
}

export interface Campaign {
  id: string;
  name: string;
  status: 'running' | 'draft' | 'completed';
  recipients: number;
  openRate: number;
  type: 'standard' | 'ai_personalized';
}

export interface GroundingLink {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp?: Date;
  images?: string[];
  groundingLinks?: GroundingLink[];
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

export interface LiveTranscription {
  id: string;
  text: string;
  role: 'user' | 'model';
}
