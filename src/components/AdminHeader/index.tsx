import { useRouter } from 'next/router';

import { useGetMe } from '@/api/auth/get-me';
import { accessTokenCookie, refreshTokenCookie } from '@/helpers/tokens/tokens';
import Container from '@/layout/Container';
import Button from '@/ui/Button';
import Logo from '@/ui/Logo';
import Typography from '@/ui/Typography';

const AdminHeader = () => {
  const { data: me } = useGetMe();
  const { push } = useRouter();

  const handleLogout = () => {
    accessTokenCookie.remove();
    refreshTokenCookie.remove();
    push('/admin');
  };

  return (
    <header className="bg-white py-[15px] fixed top-0 left-0 w-full z-50">
      <Container className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-[14px]">
          <div>
            <Typography variant="heading4" weight={700}>
              {me?.name ?? 'Admin'}
            </Typography>
            <Typography variant="heading5" color="gray">
              {me?.email}
            </Typography>
          </div>
          <Button color="neutral" className="!px-[16px] !py-[7px] !h-[32px]" onClick={handleLogout}>
            <Typography variant="heading4">Выход</Typography>
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default AdminHeader;
