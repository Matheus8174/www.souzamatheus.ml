import { FaCopyright } from 'react-icons/fa';
import { Icon, HStack, Text, useColorMode } from '@chakra-ui/react';

function Footer() {
  const { colorMode } = useColorMode();
  const currentYear = new Date().getFullYear();

  return (
    <HStack align="center" justify="center" h="full">
      <Icon
        color={colorMode === 'dark' ? 'white' : 'pink.600'}
        as={FaCopyright}
        fontSize="20"
      />
      <Text>2021-{currentYear} Feito com ❤️ por Matheus Araújo.</Text>
    </HStack>
  );
}

export default Footer;
