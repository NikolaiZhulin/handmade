import { FC, PropsWithChildren } from 'react';

import Heading2 from '@/ui/Heading2';
import Logo from '@/ui/Logo';
import Heading5 from '@/ui/Heading5';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';

interface IProps {}

const Develop: FC<PropsWithChildren<IProps>> = () => {
  return (
    <main className={style.Develop}>
      <Logo></Logo>
      <HomeSvgSelector id="develop"></HomeSvgSelector>
      <Heading2>Делаем сайт лучше</Heading2>
      <Heading5>Мы скоро возобновим работу, заходите позже</Heading5>
    </main>
  );
};

export default Develop;
