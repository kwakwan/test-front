import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { SessionProvider, useSession } from 'next-auth/react';
import '../styles/globals.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )


}

export default MyApp
