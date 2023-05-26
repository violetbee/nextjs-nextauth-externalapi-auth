import type { GetServerSidePropsContext } from 'next';
import { http, setToken } from '../../request/config/axios';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { UseQuery } from '@/utils/query';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

interface Post {
  id: string;
  title: string;
  year: string;
  genres: string[];
  director: string;
}

const movieQueryKey = ['onePost'];

const Post = () => {
  const { data, isLoading, error } = useQuery(movieQueryKey, {
    enabled: !!movieQueryKey,
  });

  return <Box key={data.id}>{data.title}</Box>;
};

export default Post;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };

  const session = await getSession({ req: context.req });

  if (session) {
    const { accessToken } = await getToken({
      req: context.req,
      secret: 'BuBirJWTGizliAnahtaridir',
    });

    if (accessToken) setToken(accessToken);
  }

  const getPosts = () =>
    http.get(`/api/posts/${id}`).then(({ data }: { data: Post }) => {
      return data;
    });

  try {
    const { dehydrated } = await UseQuery(movieQueryKey, getPosts);

    return {
      props: {
        dehydratedState: dehydrated,
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
}
