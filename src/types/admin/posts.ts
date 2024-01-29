import { PostSource } from '@/constants/enums';

export interface IAdminPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  textRu?: string;
  textEn?: string;
  textGe?: string;
  categories: string[];
  source: PostSource;
  userId: string;
}

export interface IAdminPostsStatistic {
  todayTg: number;
  todayWeb: number;
  weekTotal: number;
  weekTg: number;
  weekWeb: number;
  monthTg: number;
  monthTotal: number;
  monthWeb: number;
  todayTotal: number;
  sourceTotal: number;
  sourceTg: number;
  sourceWeb: number;
}
