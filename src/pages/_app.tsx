import '@/styles/globals.css';
import '@/styles/swiper.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useState, type ReactElement, type ReactNode, useEffect } from 'react';
import { QueryClientProvider, QueryClient, DehydratedState, Hydrate } from '@tanstack/react-query';
import '@/styles/reset.css';
import '@/styles/fonts.css';
import '@/styles/toastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { useUserContext } from '@/hooks/useUserContext/useUserContext';
import { UserContext } from '@/contexts/UserContext';
import HydrationRenderChecker from '@/hooks/common/HidrationRenderChecker';
import { accessTokenCookie } from '@/helpers/tokens/tokens';
import TokensWrapper from '@/containers/TokensWrapper';
import { PageWrapper } from '@/layout/PageWrapper';
import { ModalContext } from '@/contexts/ModalContext';
import { useModalContext } from '@/hooks/useModalContext/useModalContext';
import { SOCIAL_AUTH_CHANEL } from '@/constants/base';

import nextI18NextConfig from '../../next-i18next.config';
// import '../../i18n';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout<T>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<{ dehydratedState: DehydratedState }>) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const contextValue = useUserContext();
  const modalContext = useModalContext();
  const { query, pathname } = useRouter();

  useEffect(() => {
    if (query.accessToken && query.refreshToken && /auth/.test(pathname)) {
      const bc = new BroadcastChannel(SOCIAL_AUTH_CHANEL);
      bc.postMessage(
        JSON.stringify({
          accessToken: query.accessToken,
          refreshToken: query.refreshToken,
          name: query.name,
          id: query.id,
        }),
      );
      bc.close();
      window.close();
    }
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            refetchOnMount: false,
            retry: 1,
            retryOnMount: false,
          },
        },
      }),
  );

  useEffect(() => {
    if (accessTokenCookie.value()) {
      contextValue[1]({ accessToken: accessTokenCookie.value() });
    }
    console.log(process.env);
  }, []);

  return getLayout(
    <>
      <HydrationRenderChecker />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserContext.Provider value={contextValue}>
            <ModalContext.Provider value={modalContext}>
              <TokensWrapper>
                <PageWrapper>
                  <Component {...pageProps} />
                </PageWrapper>
              </TokensWrapper>
            </ModalContext.Provider>
            <ToastContainer
              position="bottom-right"
              autoClose={4000}
              closeOnClick={true}
              pauseOnHover={false}
            />
          </UserContext.Provider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>,
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
