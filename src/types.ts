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
  WHATSAPP = 'whatsapp',
  INSTAGRAM = 'instagram',
}
