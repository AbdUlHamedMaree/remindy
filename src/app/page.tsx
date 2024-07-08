'use client';

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import type { NextAppPage } from '$/types/next-app-page';
import { EventCard } from '$/components/dumb/event-card/component';
import { Add } from '@mui/icons-material';
import { useList, useToggle } from 'react-use';
import { useCallback, useMemo } from 'react';
import type { EventModel } from '$/models/event';
import { faker } from '@faker-js/faker';
import { getEventAt } from '$/helpers/get-event-at';

(window as any).getEventAt = getEventAt;

const FAB_POSITIONS = [16, 24];

type PageProps = {
  //
};

const Page: NextAppPage<PageProps> = () => {
  const [events, eventsActions] = useList<EventModel>([
    {
      id: '7b8b8b5b-6ed0-4e35-813c-01da791463a6',
      title: 'Buy groceries',
      at: '2024-07-08T21:02',
      repeat: 'weekly',
      description: '',
    },
    {
      id: 'f5c20ecd-f0c8-4202-a55f-693aae45aa68',
      title: 'Check car engine',
      at: '2024-07-08T23:20',
      repeat: 'monthly',
      description: '- check engine oil.\n- check head lights.\n- check flesher.',
    },
  ]);

  const [open, toggle] = useToggle(false);

  const handleOpen = useCallback(() => toggle(true), [toggle]);
  const handleClose = useCallback(() => toggle(false), [toggle]);

  const eventsJsx = useMemo(
    () =>
      events.map(event => (
        <EventCard
          key={event.id}
          title={event.title}
          at={getEventAt(event)}
          description={event.description}
          onEdit={() => console.log('not implemented+')}
          onRemove={() => eventsActions.filter(e => e.id !== event.id)}
        />
      )),
    [events, eventsActions]
  );

  return (
    <Container maxWidth='lg'>
      <Stack spacing={1} alignItems='center' sx={{ mt: 2 }}>
        {eventsJsx}
      </Stack>
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'absolute', right: FAB_POSITIONS, bottom: FAB_POSITIONS }}
        onClick={handleOpen}
      >
        <Add />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            const formData = new FormData(ev.currentTarget);
            const formJson = Object.fromEntries(formData.entries()) as Omit<
              EventModel,
              'id'
            >;

            const event: EventModel = {
              id: faker.string.uuid(),
              ...formJson,
            };

            console.log(event);
            eventsActions.push(event);

            handleClose();
          },
          sx: { width: 480, maxWidth: '100%' },
        }}
      >
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill the data to create a new event</DialogContentText>
          <TextField
            required
            margin='dense'
            id='title'
            name='title'
            label='Title'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            required
            margin='dense'
            id='at'
            name='at'
            label='At'
            type='datetime-local'
            fullWidth
            variant='standard'
          />
          <TextField
            required
            margin='dense'
            id='repeat'
            name='repeat'
            label='Repeat'
            fullWidth
            variant='standard'
            select
            defaultValue='no-repeat'
          >
            <MenuItem value='no-repeat'>No Repeat</MenuItem>
            <MenuItem value='yearly'>Yearly</MenuItem>
            <MenuItem value='quarterly'>Quarterly</MenuItem>
            <MenuItem value='monthly'>Monthly</MenuItem>
            <MenuItem value='weekly'>Weekly</MenuItem>
            <MenuItem value='daily'>Daily</MenuItem>
          </TextField>
          <TextField
            margin='dense'
            id='description'
            name='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            multiline
            minRows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' type='submit'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Page;
