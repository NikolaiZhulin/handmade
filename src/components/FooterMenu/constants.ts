export const FOOTER_MENU_ITEM = [
  { icon: 'menu-home', text: 'breadcrumbs.main', href: '/' },
  { icon: 'menu-ads', text: 'profile.my_ads', href: (id: string) => `/profile/${id}/posts` },
  {
    icon: 'menu-star',
    text: 'profile.myFavourite',
    href: (id: string) => `/profile/${id}/favourite`,
  },
  { icon: 'menu-profile', text: 'profile.profile', href: (id: string) => `/profile/${id}` },
];
