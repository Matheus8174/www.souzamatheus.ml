import { IconType } from 'react-icons';
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
  theme,
  ColorMode,
} from '@chakra-ui/react';

type IconProps = {
  colorMode: ColorMode;
  icon: IconType;
  title: string;
} & ChakraIconProps;

const Icon = ({ icon, colorMode, ...rest }: IconProps) => (
  <ChakraIcon
    as={icon}
    color={colorMode === 'dark' ? 'white' : theme.colors.gray[800]}
    transition="color .2s"
    _hover={{ color: colorMode === 'dark' ? 'pink.500' : 'pink.600' }}
    fontSize="xx-large"
    {...rest}
  />
);

export default Icon;
