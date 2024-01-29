export const getImage = (name: string, extraPath?: string) => {
  return `${process.env.NEXT_PUBLIC_POSTS_API_URL}/api/v1/posts/image/${name}?extraPath=${
    extraPath ?? ''
  }`;
};
