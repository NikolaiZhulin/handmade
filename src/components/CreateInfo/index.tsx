import { FC, PropsWithChildren, useMemo } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/utils';

import Breadcrumbs from '../Breadcrumbs';

import { FirstStep } from './components/FirstStep';
import { FourthStep } from './components/FourthStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';

interface IProps {
  step: number;
  setStep: (value: number) => void;
}

const CreateInfo: FC<PropsWithChildren<IProps>> = ({ step, setStep }) => {
  const isLaptop = useMediaQuery('(max-width: 1200px)');
  const onStep = (direction: number) => setStep(direction);

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
      <Breadcrumbs className="2xl:p-0 xs:p-0" />
      <div className={cn('2xl:h-full')}>{formSteps[step]}</div>
    </>
  );
};

export default CreateInfo;
