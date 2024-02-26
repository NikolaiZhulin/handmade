import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfilePageLayout from '@/containers/pages/ProfilePageLayout';
import ProfileLeftBlock from '@/components/Profile/ProfileLeftBlock';
import Favourite from '@/components/Favourite';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? context.defaultLocale ?? '', ['common'])),
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
      <Header />
      <ProfilePageLayout left={<ProfileLeftBlock />} right={<Favourite />} />
      <Footer withMenu />
    </>
  );
}
