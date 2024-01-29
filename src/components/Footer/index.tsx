import { FC } from 'react';

import Container from '@/layout/Container';
import { useTranslation } from '@/hooks/useTranslation';
import Typography from '@/ui/Typography';
import { cn } from '@/utils/utils';
import FooterMenu from '@/components/FooterMenu';

import style from './style.module.scss';

type Props = {
  withMenu?: boolean;
};

const Footer: FC<Props> = ({ withMenu = false }) => {
  const { t } = useTranslation();

  return (
    <footer className={cn(style.Footer, '2xl:!p-[0]')}>
      <Container>
        <div
          className={cn(style.FooterContainer, 'xs:!p-[20px]', withMenu ? '2xl:hidden' : undefined)}
        >
          <Typography variant="text3" className={cn(style.Heading5, 'xs:!text-left')}>
            <span>© Handmade</span> — {t('footer.text1')} {''}
          </Typography>
        </div>
        {withMenu && <FooterMenu />}
      </Container>
    </footer>
  );
};

export default Footer;
