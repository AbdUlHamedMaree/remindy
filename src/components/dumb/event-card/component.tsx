import type { AwaitableNoop } from '$/types/awaitable';
import { Delete, Edit } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';

export type EventCardProps = {
  title?: string;
  at?: string;
  description?: string;

  onEdit?: AwaitableNoop;
  onRemove?: AwaitableNoop;
};

export const EventCard: React.FC<EventCardProps> = ({
  title,
  at,
  description,
  onEdit,
  onRemove,
}) => {
  return (
    <Card sx={{ maxWidth: '100%', width: 320 }}>
      <CardHeader title={title} />
      <CardContent>
        <Typography>{at}</Typography>
        <Typography color='text.secondary' mt={1}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton size='small' color='error' onClick={onRemove}>
          <Delete />
        </IconButton>
        <IconButton color='primary' onClick={onEdit}>
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  );
};
