import { FC, PropsWithChildren } from 'react';

import Heading2 from '@/ui/Heading2';
import Heading3 from '@/ui/Heading3';
import Logo from '@/ui/Logo';

import { HomeSvgSelector } from '../svg/HomeSvgSelector';

import style from './style.module.scss';

interface IProps {}

const Develop: FC<PropsWithChildren<IProps>> = () => {
  return (
    <main className={style.Develop}>
      <Logo></Logo>
      <HomeSvgSelector id="develop"></HomeSvgSelector>
      <Heading2>Делаем сайт лучше</Heading2>
      <Heading3>Мы скоро возобновим работу, заходите позже</Heading3>
    </main>
  );
};

export default Develop;
