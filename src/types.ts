export interface Category {
  id: number;
  isActive: boolean;
  name: string;
  description: string | null;
  isFeatured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  seoUrl: string | null;
  categoryId: string | null;
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
