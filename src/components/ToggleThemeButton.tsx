import React from 'react';

import {
  useColorMode,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { FiMoon, FiSun } from 'react-icons/fi';

const ToggleThemeButton: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={() => toggleColorMode()}
      leftIcon={
        <Icon
          fontSize="20"
          color={useColorModeValue('blue.500', 'pink.400')}
          as={useColorModeValue(FiMoon, FiSun)}
        />
      }
    >
      MUDAR TEMA
    </Button>
  );
};

export default ToggleThemeButton;
