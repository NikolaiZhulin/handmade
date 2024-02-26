import { ReactNode } from 'react';

import ConfirmBeforeClick from '@/components/ConfirmBeforeClick';
import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';

export const config = [
  [
    {
      icon: 'search',
      title: 'main.sideMenu.search',
      link: () => '/',
      badge: false,
    },
  ],
  [
    {
      icon: 'search',
      title: 'main.sideMenu.search',
      link: () => '/',
      badge: false,
    },
    {
      title: 'profile.myPosts',
      link: (id: string) => `/profile/${id}/posts`,
      icon: 'posts',
      badge: false,
      regexp: /\/profile\/\[id\]\/posts/,
    },
    {
      title: 'profile.myFavourite',
      link: (id: string) => `/profile/${id}/favourite`,
      icon: 'star_filled',
      badge: true,
      regexp: /\/profile\/\[id\]\/favourite/,
    },
    {
      title: 'profile.logout',
      link: () => '/',
      icon: 'logout',
      badge: false,
      render: (
        trigger: ReactNode,
        text: string,
        approveText: string,
        cb?: () => void,
        declineCb?: () => void,
      ) => (
        <ConfirmBeforeClick
          text={text}
          confirmHandler={() => {
            accessTokenCookie.remove();
            refreshTokenCookie.remove();
            cb?.();
          }}
          triggerClassName="w-full"
          approveText={approveText}
          declineHandler={declineCb}
        >
          {trigger}
        </ConfirmBeforeClick>
      ),
    },
  ],
];
