export const config = [
  {
    id: 'facebook',
    className: 'facebock',
    label: 'Facebook',
    mainBg: 'bg-blue hover:bg-light-blue transition-[background-color] duration-250',
    lowBg: 'bg-light-blue transition-[background-color] duration-250',
    action: () => {
      window.open(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/facebook`,
        'newwindow',
        'toolbar=no, menubar=no, width=600, height=700, opener',
      );
    },
  },
  {
    id: 'google',
    className: 'google',
    label: 'Google',
    mainBg: 'bg-red hover:bg-light-red transition-[background-color] duration-250',
    lowBg: 'bg-light-red transition-[background-color] duration-250',
    action: () => {
      window.open(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/google`,
        'newwindow',
        'toolbar=no, menubar=no, width=600, height=700, opener',
      );
    },
  },
];
