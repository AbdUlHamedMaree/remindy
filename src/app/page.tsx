import { Box, Container, Typography } from '@mui/material';

import type { NextAppPage } from '$/types/next-app-page';
import { EventCard } from '$/components/dumb/event-card/component';

type PageProps = {
  //
};

const Page: NextAppPage<PageProps> = () => {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in TypeScript
        </Typography>
        <EventCard />
      </Box>
    </Container>
  );
};

export default Page;
