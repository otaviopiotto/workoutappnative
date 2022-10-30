export interface GroupType {
  _id: string | number;
  title: string;
  description: string;
  days: dayType[];
}

export interface dayType {
  _id?: string | number;
  number?: number;
  muscle_group: string;
  workout?: exerciseType[];
}

export interface exerciseType {
  _id?: string | number;
  exercise?: string;
  sets?: number;
  repetition?: number;
  time?: number;
  observation?: string;
}
