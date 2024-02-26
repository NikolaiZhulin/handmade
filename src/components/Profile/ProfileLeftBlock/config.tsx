import { ReactNode } from 'react';

import ConfirmBeforeClick from '@/components/ConfirmBeforeClick';
import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';
import FeedbackModal from '@/components/modals/FeedbackModal';

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
  // {
  //   title: 'breadcrumbs.history',
  //   link: (id: string) => `/profile/${id}/history`,
  //   icon: 'history-icon',
  //   badge: true,
  //   regexp: /\/profile\/\[id\]\/history/,
  // },
  {
    title: 'header.help',
    link: '/',
    icon: 'help-icon',
    badge: true,
    openModal: true,
    component: (trigger: ReactNode, isOpen: boolean) => (
      <FeedbackModal trigger={trigger} isOpen={isOpen} />
    ),
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
