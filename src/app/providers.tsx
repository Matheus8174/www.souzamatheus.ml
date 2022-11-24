'use client';

import { PropsWithChildren } from 'react';
import {
  Stack,
  ChakraProvider,
  ColorModeScript,
  Grid,
  GridItem,
  theme as chakraTheme,
} from '@chakra-ui/react';

import Link from 'next/link';
import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';

import Header from '@components/Header';
import Footer from '@components/Footer';

import theme from '@styles/theme';
import { repositoryName } from '../lib/prismicio';

function Providers({ children }: PropsWithChildren) {
  const { space } = chakraTheme;

  return (
    <PrismicProvider internalLinkComponent={Link}>
      <PrismicPreview repositoryName={repositoryName}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Grid
            h="100vh"
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
              <Stack align="center" justify="center" h="full" w="100%">
                {children}
              </Stack>
            </GridItem>
            <GridItem area="footer" as="footer">
              <Footer />
            </GridItem>
          </Grid>
        </ChakraProvider>
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default Providers;
