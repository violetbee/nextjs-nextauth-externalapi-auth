// Next
import { type AppType } from 'next/app';

// Next-Auth
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

// React-Query
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from '@tanstack/react-query';
import queryClientConfiguration from '@/request/config/queryClient';

// Chakra-UI
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';

const MyApp: AppType<{
  session: Session | null;
  dehydratedState: DehydratedState;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
