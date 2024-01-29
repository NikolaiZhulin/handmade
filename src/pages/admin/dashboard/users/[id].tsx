import Head from 'next/head';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import Footer from '@/components/Footer';
import { getUserPosts } from '@/api/posts/get-user-posts';
import Container from '@/layout/Container';
import Main from '@/layout/Main';
import MainWrapper from '@/layout/MainWrapper';
import RightBlock from '@/layout/RightBlock';
import ContactsBlock from '@/components/UserPosts/ContactsBlock';
import PostsBlock from '@/components/UserPosts/PostsBlock';
import AdminHeader from '@/components/AdminHeader';
import AdminLeftBlock from '@/layout/AdminLeftBlock';
import { HomeSvgSelector } from '@/components/svg/HomeSvgSelector';
import Typography from '@/ui/Typography';

export const getServerSideProps = async (context: GetServerSidePropsContext<{ id: string }>) => {
  const { locale, defaultLocale, params } = context;
  const data = await getUserPosts(params?.id ?? '');

  return {
    props: {
      posts: data.posts,
      user: data.user,
      ...(await serverSideTranslations(locale ?? defaultLocale ?? '', ['common'])),
    },
  };
};

export default function User({
  posts,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <AdminHeader />
        <Main className="!pt-[62px]">
          <MainWrapper>
            <AdminLeftBlock />
            <RightBlock
              style={{ overflow: 'unset' }}
              className="flex justify-between gap-[30px] flex-col"
            >
              <div className="flex flex-col gap-[14px]">
                <Link href="/admin/dashboard/users" className="flex gap-[14px] items-center">
                  <HomeSvgSelector id="arrow-left" />
                  Назад
                </Link>
                <Typography variant="heading2">{user.id}</Typography>
              </div>
              <div className="flex justify-between gap-[30px]">
                <ContactsBlock user={user} isAdmin={true} />
                <PostsBlock posts={posts} />
              </div>
            </RightBlock>
          </MainWrapper>
        </Main>
      </Container>
      <Footer />
    </>
  );
}
