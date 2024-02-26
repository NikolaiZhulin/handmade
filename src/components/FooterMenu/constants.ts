export const FOOTER_MENU_ITEM = [
  { icon: 'menu-home', text: 'Главная', href: '/' },
  { icon: 'menu-ads', text: 'Мои объяв.', href: (id: string) => `/profile/${id}/posts` },
  { icon: 'menu-star', text: 'Избранное', href: (id: string) => `/profile/${id}/favourite` },
  { icon: 'menu-profile', text: 'Профиль', href: (id: string) => `/profile/${id}` },
];
