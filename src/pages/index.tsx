import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SearchPage from '@/containers/pages/SearchPage';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { locale, defaultLocale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale ?? '', ['common'])),
    },
  };
};

const Index = ({}) => {
  return (
    <>
      <Head>
        <title>Handmade. Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SearchPage />
      <Footer withMenu />
    </>
  );
};

export default Index;
