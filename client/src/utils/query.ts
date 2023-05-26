import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

export const UseQuery = async (
  queryKey: string[],
  queryFn: () => Promise<any>,
  id?: string
) => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({ queryKey: queryKey, queryFn });

  const dehydrated = dehydrate(queryClient);

  return { dehydrated, useQuery };
};
