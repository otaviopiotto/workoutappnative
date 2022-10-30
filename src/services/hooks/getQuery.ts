import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";

const get = async (url: string) => {
  const { data } = await api.get(url);
  return data;
};

export const getQuery = (
  url: string,
  actions: any[],
  options?: UseQueryOptions<any>
) => {
  return useQuery(actions, () => get(url), { ...(options as any) });
};
