import type { EventModel } from '$/models/event';
import { format } from 'date-fns';

export const getEventAt = ({ repeat, at }: Pick<EventModel, 'repeat' | 'at'>) => {
  switch (repeat) {
    case 'no-repeat':
      return format(at, 'PPPPpp');
    case 'yearly':
      return format(at, "'Every' MMMM do 'at' pp");
    case 'quarterly':
      return format(at, "'Every quarter at' MMMM do 'at' pp");
    case 'monthly':
      return format(at, "'Every month at' do, pp");
    case 'weekly':
      return format(at, "'Every' eeee 'at' pp");
    case 'daily':
      return format(at, "'Every day at' pp");
  }
};
