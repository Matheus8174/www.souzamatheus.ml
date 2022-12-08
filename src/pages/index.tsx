import {
  Box,
  Text,
  VStack,
  HStack,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

import { AiFillGithub, AiFillMail, AiFillLinkedin } from 'react-icons/ai';

import Icon from '@components/Icon';
import Head from 'next/head';
import DevAnimation from '../animations/DevAnimation';

function Home() {
  const { colorMode } = useColorMode();

  return (
    <Stack
      w="full"
      spacing={{ base: '4', lg: '12' }}
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'center', lg: 'inherit' }}
      justify="center"
      px={{ base: '10', lg: 'none' }}
    >
      <Head>
        <title>Home | Matheus Araújo</title>
      </Head>
      <VStack h="full">
        <Box
          w={{ base: '160px', lg: '200px' }}
          h={{ base: '160px', lg: '200px' }}
        >
          <DevAnimation />
        </Box>
        <HStack justify="space-around" align="center" w="full" spacing="4">
          <Link
            href="https://www.linkedin.com/in/matheus-ara%C3%BAjo-4561821ba/"
            target="_blank"
          >
            <Icon icon={AiFillGithub} colorMode={colorMode} title="Github" />
          </Link>
          <Link href="mailto:souzamatheus8174@gmail.com">
            <Icon icon={AiFillMail} title="Email" colorMode={colorMode} />
          </Link>
          <Link href="https://github.com/Matheus8174" target="_blank">
            <Icon
              icon={AiFillLinkedin}
              title="Linkedin"
              colorMode={colorMode}
            />
          </Link>
        </HStack>
      </VStack>
      <VStack
        h="full"
        justify="space-around"
        w={{ base: 'full', lg: '70%', xl: '55%' }}
        spacing={{ base: '4', lg: '0' }}
        align={{ base: 'center', lg: 'start' }}
      >
        <Box
          rounded="base"
          bgColor="pink.600"
          px="4"
          fontWeight="bold"
          color="white"
        >
          Fullstack Developer
        </Box>
        <Text
          fontSize={{ base: '2xl', lg: '3xl' }}
          fontWeight="bold"
          textAlign={{ base: 'center', lg: 'start' }}
        >
          Trabalho no desenvolvimento de aplicações web performáticas e com foco
          na experiência de usuário.
        </Text>
        <Text
          color={useColorModeValue('pink.600', 'pink.400')}
          fontSize={{ base: 'large', lg: 'xl', xl: '2xl' }}
          fontWeight="bold"
          textAlign={{ base: 'center', lg: 'start' }}
        >
          Tecnologias que já utilizei: Nextjs, Typeorm, Express e Typescript
        </Text>
      </VStack>
    </Stack>
  );
}

export default Home;
