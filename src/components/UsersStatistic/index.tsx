import Typography from '@/ui/Typography';
import { useGetStatistic } from '@/api/admin/users/get-statistic';
import { useTranslation } from '@/hooks/useTranslation';

import { config } from './config';

const UsersStatistic = () => {
  const { data } = useGetStatistic();
  const { t } = useTranslation();

  return (
    <div className="flex gap-5 w-full">
      {data &&
        config.map((conf) => (
          <div key={conf.key} className="p-[30px] rounded-[6px] flex flex-col gap-1 w-1/5 bg-white">
            <Typography variant="heading2" weight={700}>
              {conf.sign}
              {data[conf.key as keyof typeof data]}
            </Typography>
            <Typography variant="heading4" color="gray">
              {t(conf.label)}
            </Typography>
          </div>
        ))}
    </div>
  );
};

export default UsersStatistic;
