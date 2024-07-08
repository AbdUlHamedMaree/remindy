import type { EventRepeatUnion } from './event-repeat';

export type EventModel = {
  id: string;
  at: string;
  description: string;
  repeat: EventRepeatUnion;
  title: string;
};
