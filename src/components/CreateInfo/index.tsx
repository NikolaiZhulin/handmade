import { FC, PropsWithChildren, useMemo, useState } from 'react';

import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import Breadcrumbs from '../Breadcrumbs';

import ThirdStep from './components/ThirdStep';
import SecondStep from './components/SecondStep';
import { FirstStep } from './components/FirstStep';
import style from './style.module.scss';
import { FourthStep } from './components/FourthStep';

interface IProps {}

const CreateInfo: FC<PropsWithChildren<IProps>> = () => {
  const [step, setStep] = useState(0);
  const onStep = (direction: number) => setStep((prev) => prev + direction);
  const isLaptop = useMediaQuery('(max-width: 1200px)');

  const formSteps = useMemo(() => {
    return [
      <FirstStep onStep={onStep} key={1} />,
      <SecondStep onStep={onStep} key={2} />,
      <ThirdStep onStep={onStep} key={3} />,
      <FourthStep onStep={onStep} key={4} />,
    ];
  }, []);

  return (
    <>
      {step === 0 && isLaptop && <Breadcrumbs className="2xl:p-0 xs:px-0" />}
      <div className={cn(style.CreateInfo, '2xl:h-full')}>{formSteps[step]}</div>
    </>
  );
};

export default CreateInfo;
