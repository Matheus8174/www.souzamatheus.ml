import React, { PropsWithChildren } from 'react';
import NextLink, { LinkProps } from 'next/link';
import { FaAsterisk } from 'react-icons/fa';

import {
  Stack,
  ChakraProvider,
  Grid,
  Text,
  Box,
  GridItem,
  theme as chakraTheme,
  Icon,
  HStack,
} from '@chakra-ui/react';

import Header from '@components/Header';
import Footer from '@components/Footer';

import { PrismicProvider } from '@prismicio/react';

import theme from '@styles/theme';

const Link = ({ href, ...props }: LinkProps) => (
  <Box>
    <NextLink href={href} {...props} />
  </Box>
);

const paragraph = ({ children }: PropsWithChildren) => (
  <Text fontSize={{ base: 'lg', md: 'lg' }} textAlign="justify">
    {children}
  </Text>
);

type TextHeaderProps = {
  text: React.ReactNode;
  fz: string;
  as: any;
};

const TextHeader = ({ text, as, fz }: TextHeaderProps) => (
  <HStack spacing="4">
    <Icon
      as={FaAsterisk}
      color="pink.400"
      fontSize="2xl"
      _hover={{
        filter: 'brightness(70%)',
        transition: 'filter .2s',
      }}
    />
    <Text as={as} fontSize={fz} fontWeight="bold">
      {text}
    </Text>
  </HStack>
);

const textHeaders = {
  heading1: ({ children }: PropsWithChildren) => (
    <TextHeader as="h1" fz="3xl" text={children} />
  ),
  heading2: ({ children }: PropsWithChildren) => (
    <TextHeader as="h2" fz="2xl" text={children} />
  ),
  heading3: ({ children }: PropsWithChildren) => (
    <TextHeader as="h3" fz="3xl" text={children} />
  ),
};

function Providers({ children }: PropsWithChildren) {
  const { space } = chakraTheme;

  return (
    <ChakraProvider theme={theme}>
      <PrismicProvider
        internalLinkComponent={Link}
        richTextComponents={{
          ...textHeaders,
          paragraph,
        }}
      >
        <Grid
          minH="100vh"
          gridTemplateRows={`${space['20']} 1fr ${space['20']}`}
          gridTemplateColumns="1fr 1fr 1fr"
          templateAreas={`
            "header header header"
            "content content content"
            "footer footer footer"
          `}
          rowGap="6"
        >
          <GridItem area="header" as="header">
            <Header />
          </GridItem>
          <GridItem area="content" as="main">
            <Stack align="center" justify="center" h="full">
              {children}
            </Stack>
          </GridItem>
          <GridItem area="footer" as="footer">
            <Footer />
          </GridItem>
        </Grid>
      </PrismicProvider>
    </ChakraProvider>
  );
}

export default Providers;
