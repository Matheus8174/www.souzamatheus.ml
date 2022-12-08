import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import * as prismicH from '@prismicio/helpers';
import {
  SliceZone,
  SliceComponentProps,
  PrismicRichText,
} from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

import { Text, VStack } from '@chakra-ui/react';

import type { TitleField, PrismicDocument, ImageField } from '@prismicio/types';

import { createClient } from '@lib/prismicio';
import CodeHighlighting from '@components/CodeHighlighting';

import Head from 'next/head';
import { SliceZoneType, ParagraphsSlice } from '../../types/SliceType';
import formateDate from '../../utils/formateDate';

interface PostData extends PrismicDocument {
  data: {
    title: TitleField;
    image: ImageField;
    slices: SliceZoneType;
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const posts = await client.getAllByType('my-blog');

  return {
    paths: posts.map((post) => prismicH.asLink(post)),
    fallback: false,
  };
}

type GetStaticPropsProps = {
  post: PostData;
};

export const getStaticProps: GetStaticProps<GetStaticPropsProps> = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData });

  const post = await client.getByUID<PostData>(
    'my-blog',
    params?.slug as string,
  );

  return {
    props: { post },
    revalidate: false,
  };
};

const Paragraphs = ({ slice }: SliceComponentProps<ParagraphsSlice>) => (
  <VStack spacing="4" w="full" h="full" align="start" justify="start">
    {slice.items.map((paragraph) => (
      <PrismicRichText
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          preformatted: ({ text }) => text && <CodeHighlighting code={text} />,
        }}
        field={paragraph.paragraphs as []}
        key={paragraph.paragraphs?.toString()}
      />
    ))}
  </VStack>
);

type PostsProps = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<PostsProps> = ({ post }) => {
  return (
    <VStack spacing="6" align="center" justify="center">
      <Head>
        <title>{prismicH.asText(post.data.title)} | Matheus Araújo</title>
      </Head>
      <VStack
        spacing="6"
        px={{ base: '4', md: '8' }}
        maxW={{ base: '100vw', lg: '4xl' }}
      >
        <Text
          textAlign="center"
          as="h1"
          fontSize={{
            base: '2xl',
            lg: '3xl',
          }}
          fontWeight="bold"
        >
          {prismicH.asText(post.data.title)}
        </Text>
        <Text
          textAlign="center"
          as="h2"
          fontSize="lg"
          fontWeight="bold"
          color="gray.400"
        >
          {formateDate(post.last_publication_date)}
        </Text>
        <PrismicNextImage field={post.data.image} />
        <SliceZone
          slices={post.data.slices}
          components={{
            paragraphs: Paragraphs,
          }}
        />
      </VStack>
    </VStack>
  );
};

export default Post;
