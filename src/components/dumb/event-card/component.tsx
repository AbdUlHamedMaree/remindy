import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

export type EventCardProps = {
  //
};

export const EventCard: React.FC<EventCardProps> = () => {
  return (
    <Card sx={{ maxWidth: '100%', width: 320 }}>
      <CardHeader title='Buy groceries' />
      <CardContent>
        <Typography color='text.secondary'>Weekly at Sunday</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};
