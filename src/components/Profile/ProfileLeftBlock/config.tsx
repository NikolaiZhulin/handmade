import { ReactNode } from 'react';

import ConfirmBeforeClick from '@/components/ConfirmBeforeClick';
import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';

export const PROFILE_SIDE_LINKS = [
  {
    title: 'profile.myPosts',
    link: (id: string) => `/profile/${id}/posts`,
    icon: 'home-icon',
    badge: false,
    regexp: /\/profile\/\[id\]\/posts/,
  },
  {
    title: 'profile.myFavourite',
    link: (id: string) => `/profile/${id}/favourite`,
    icon: 'favorites-icon',
    badge: true,
    regexp: /\/profile\/\[id\]\/favourite/,
  },
  {
    title: 'breadcrumbs.history',
    link: (id: string) => `/profile/${id}/favourite`, //TODO: link
    icon: 'history-icon',
    badge: true,
    regexp: /\/profile\/\[id\]\/favourite/, //TODO: reg
  },
  {
    title: 'header.help',
    link: (id: string) => `/profile/${id}/favourite`, //TODO: link
    icon: 'help-icon',
    badge: true,
    regexp: /\/profile\/\[id\]\/favourite/, //TODO: reg
  },
  {
    title: 'profile.logout',
    link: () => '/',
    icon: 'circle-cross',
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
];
