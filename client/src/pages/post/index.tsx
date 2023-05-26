import { http } from '../../request/config/axios';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { UseQuery } from '@/utils/query';

interface Post {
  id: string;
  title: string;
  year: string;
  genres: string[];
  director: string;
}

const moviesQueryKey = ['posts'];
const getPosts = () =>
  http.get('/api/posts').then(({ data }: { data: Post[] }) => data);

const Post = () => {
  const { data, isLoading } = useQuery(moviesQueryKey, getPosts, {
    enabled: !!moviesQueryKey,
  });

  return (
    <Box>
      {data?.map((item, idx) => {
        return <Box key={idx}>{item.title}</Box>;
      })}
    </Box>
  );
};

export default Post;

export async function getServerSideProps() {
  const { dehydrated } = await UseQuery(moviesQueryKey, getPosts);

  return {
    props: {
      dehydratedState: dehydrated,
    },
  };
}
