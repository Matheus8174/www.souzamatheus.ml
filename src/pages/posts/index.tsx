/* eslint-disable camelcase */

import React from 'react';
import { VStack, Text, Box, HStack, useColorModeValue } from '@chakra-ui/react';
import { asText } from '@prismicio/helpers';
import { PrismicLink, PrismicRichText } from '@prismicio/react';

import type {
  TitleField,
  RichTextField,
  PrismicDocument,
} from '@prismicio/types';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { createClient } from '@lib/prismicio';
import Head from 'next/head';
import formateDate from '../../utils/formateDate';

interface PostsData extends PrismicDocument {
  data: {
    title: TitleField;
    content: RichTextField;
  };
}

function Card({ data: { title, content }, ...props }: PostsData) {
  const {
    tags,
    first_publication_date: createdAt,
    last_publication_date: updatedAt,
  } = props;

  let date = `atualizado em ${formateDate(updatedAt)}`;

  if (new Date(createdAt).getTime() === new Date(updatedAt).getTime()) {
    date = `criado em ${formateDate(createdAt)}`;
  }

  return (
    <Box
      as="section"
      maxW={{ base: 'sm', sm: '2xl' }}
      bgColor={useColorModeValue('white', 'gray.900')}
      px={{ base: '2', sm: '8' }}
      py={{ base: '2', sm: '4' }}
      rounded="base"
      boxShadow={useColorModeValue('gray 1px 2px 12px', 'white 1px 2px 12px')}
    >
      <PrismicLink document={{ ...props, data: { title, content } }}>
        <Text
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          transition="color .2s"
          cursor="pointer"
          _hover={{
            color: useColorModeValue('pink.600', 'pink.500'),
          }}
        >
          {asText(title)}
        </Text>
      </PrismicLink>
      <Text as="h4" fontSize="lg" color="gray.200" my="3">
        {date}
      </Text>
      <PrismicRichText field={content} />
      <HStack spacing="4" mt="5">
        {tags.map((tag) => (
          <Box
            rounded="base"
            fontSize={{ base: 'md' }}
            color="white"
            px="2"
            py="0.5"
            fontWeight="bold"
            bgColor="pink.500"
            key={tag}
          >
            {tag}
          </Box>
        ))}
      </HStack>
    </Box>
  );
}

type GetStaticPropsProps = {
  posts: PostsData[];
};

export const getStaticProps: GetStaticProps<GetStaticPropsProps> = async ({
  previewData,
}) => {
  const client = createClient({ previewData });

  const posts = await client.getByType<PostsData>('my-blog');

  return {
    revalidate: false,
    props: {
      posts: posts.results,
    },
  };
};

type PostsProps = InferGetStaticPropsType<typeof getStaticProps>;

const Posts: NextPage<PostsProps> = ({ posts: data }) => {
  return (
    <Box>
      <Head>
        <title>Posts | Matheus Araújo</title>
      </Head>
      <Text
        mb="16"
        textAlign="center"
        as="h1"
        fontSize={{
          base: '3xl',
          lg: '4xl',
        }}
        fontWeight="bold"
      >
        Ultimas publicações
      </Text>
      <VStack spacing="16" px="4">
        {data.map(({ id, ...card }) => (
          <Card key={id} {...{ id, ...card }} />
        ))}
      </VStack>
    </Box>
  );
};

export default Posts;
