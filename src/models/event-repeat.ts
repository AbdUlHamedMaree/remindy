export enum EventRepeatEnum {
  'no-repeat' = 'no-repeat',
  yearly = 'yearly',
  quarterly = 'quarterly',
  monthly = 'monthly',
  weekly = 'weekly',
  daily = 'daily',
}

export type EventRepeatUnion = keyof typeof EventRepeatEnum;
