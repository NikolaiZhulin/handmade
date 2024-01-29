import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Footer from '@/components/Footer';
import CategoriesPage from '@/containers/pages/admin/CategoriesPage';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { locale, defaultLocale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale ?? '', ['common'])),
    },
  };
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CategoriesPage />
      <Footer />
    </>
  );
}
