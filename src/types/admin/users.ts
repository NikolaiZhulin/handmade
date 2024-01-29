export interface IUserData {
  id: string;
  createdAt: string;
  phone: string;
  email: string;
  city: string;
  activity: string;
}

export interface IStatisticResponse {
  total: number;
  today: number;
  week: number;
  month: number;
  active: number;
}
