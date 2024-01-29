import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getPostById } from '@/api/posts/post-by-id';
import Header from '@/components/Header';
import Container from '@/layout/Container';
import MainWrapper from '@/layout/MainWrapper';
import LeftBlockPost from '@/layout/LeftBlockPost';
import Main from '@/layout/Main';
import PostDescription from '@/components/PostDescription';
import OtherAnnouncement from '@/components/OtherAnnouncement';
import RightBlockPost from '@/layout/RightBlockPost';
import Footer from '@/components/Footer';
import ImagesPost from '@/components/ImagesPost';
import BanerTop from '@/components/BanerTop';
import { useTranslation } from '@/hooks/useTranslation';
import { capitalize } from '@/helpers/capitalize';
import Breadcrumbs from '@/components/Breadcrumbs';
import { categories } from '@/constants/categories';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const getServerSideProps = async (ctx: GetServerSidePropsContext<{ id: string }>) => {
  const params = ctx.params;
  const token = ctx.req.cookies.unlim_accessToken;
  const data = await getPostById({ id: params?.id ?? '' }, token);

  return {
    props: {
      post: data,
      ...(await serverSideTranslations(ctx.locale ?? ctx.defaultLocale ?? '', ['common'])),
    },
  };
};

const PostPage = ({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  const langs = [post.textRu, post.textEn, post.textGe];
  let currentLangText = post[`text${capitalize(language)}` as keyof typeof post] as string;
  if (!currentLangText) {
    currentLangText = langs.find((el) => el) as string;
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isHideSearch={true} isHideCounter={true} className="2xl:!pb-[14px]" />
      <Main className="xs:!pt-[60px] 2xl:!pt-[72px]">
        <Container>
          <BanerTop />
          {!isLaptop && (
            <Breadcrumbs
              currentPath={t(
                categories.find((el) => post.categories.includes(el.value))?.label ?? '',
              )}
              currentLink={`/search?category=${post.categories[0]}`}
            />
          )}
          <MainWrapper className="justify-between 2xl:flex-col 2xl:w-full 2xl:!mt-0 !mt-[14px]">
            <LeftBlockPost className="w-[895px] 2xl:!w-full 2xl:!rounded-none">
              {!!post.images.length && <ImagesPost images={post.images} />}
              {isLaptop && (
                <RightBlockPost
                  price={post.price}
                  currency={post.currency}
                  time={post.updatedAt}
                  postCategories={post.categories}
                  city={post.city}
                  address={post.address}
                  contacts={post.contacts}
                  id={post.id}
                />
              )}
              {currentLangText && <PostDescription text={currentLangText} postId={post.id} />}
              {!!post.userPosts.length && (
                <OtherAnnouncement
                  posts={post.userPosts}
                  totalCount={post.userPostsCount}
                  userId={post.user.id}
                />
              )}
            </LeftBlockPost>
            {!isLaptop && (
              <RightBlockPost
                price={post.price}
                currency={post.currency}
                time={post.updatedAt}
                postCategories={post.categories}
                city={post.city}
                address={post.address}
                contacts={post.contacts}
                id={post.id}
              />
            )}
          </MainWrapper>
        </Container>
      </Main>

      <Footer />
    </>
  );
};

export default PostPage;
