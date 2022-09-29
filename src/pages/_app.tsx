import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'

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
