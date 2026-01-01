
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  EMAIL_LISTS = 'EMAIL_LISTS',
  ACCOUNTS = 'ACCOUNTS',
  CAMPAIGNS = 'CAMPAIGNS',
  ANALYTICS = 'ANALYTICS',
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

// Added GroundingLink interface to support search grounding citations
export interface GroundingLink {
  uri: string;
  title: string;
}

// Updated Message interface to include optional fields for metadata, visual input, and grounding results
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp?: Date;
  images?: string[];
  groundingLinks?: GroundingLink[];
}

// Added GeneratedImage interface used by the Image Generation workspace
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

// Added LiveTranscription interface for real-time voice interaction logs
export interface LiveTranscription {
  id: string;
  text: string;
  role: 'user' | 'model';
}
