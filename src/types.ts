export interface Category {
  id: number;
  active: boolean;
  name: string;
  description: string | null;
  featured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  seoUrl: string | null;
  categoryId: string | null;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Link {
  id: number;
  name: string;
  url: string;
}

export interface Social {
  id: number;
  type: SocialType;
  value: string;
}

export enum SocialType {
  INSTAGRAM = 'instagram',
  WHATSAPP = 'whatsapp',
}
