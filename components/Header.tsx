'use client';

import React from 'react';
import Link from 'next/link';

import {
  useColorMode,
  Menu,
  MenuButton,
  Stack,
  MenuList,
  MenuItem,
  ListItem,
  ListIcon,
  List,
  Box,
  Flex,
  Text,
  useBreakpoint,
} from '@chakra-ui/react';
import { FiHome, FiPhoneCall, FiBook } from 'react-icons/fi';

import MenuAnimation from '../animations/MenuAnimation';
// import ToggleThemeButton from './ToggleThemeButton';

const Header: React.FC = () => {
  const currentViewSize = useBreakpoint();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hoverAnimation, setHoverAnimation] = React.useState(false);

  const { colorMode } = useColorMode();
  const menuItems = [
    { id: 1, item: 'Home', icon: FiHome, to: '/' },
    { id: 2, item: 'Publicações', icon: FiBook, to: '/posts' },
    { id: 3, item: 'Contato', icon: FiPhoneCall, to: '/contact' },
  ];

  const isMobile: { [x: string]: boolean } = {
    sm: true,
    md: true,
    base: true,
  };

  const isDark = colorMode === 'dark';

  return (
    <Flex
      h="full"
      align="center"
      justify="center"
      color={isDark ? 'white' : 'gray.900'}
    >
      <Stack direction="row" w="90%" justify="space-between" align="center">
        <Link href="/">
          <Stack direction="row" cursor="pointer">
            <Stack
              direction="row"
              spacing="0.5"
              align="center"
              fontSize="x-large"
              fontWeight="bold"
              letterSpacing="wide"
            >
              <Text>Matheus Araújo</Text>
              <Text as="span" fontSize="xx-large" ml="1" color="pink.500">
                .
              </Text>
            </Stack>
          </Stack>
        </Link>

        {isMobile[currentViewSize] ? (
          <Flex align="center" justify="center">
            <Box
              rounded="full"
              zIndex="-1"
              w="40px"
              h="40px"
              bgColor={isDark ? 'gray.700' : ''}
              pos="absolute"
              display={hoverAnimation ? 'block' : 'none'}
            />
            <Menu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onOpen={() => setIsMenuOpen(true)}
            >
              <MenuButton
                aria-label="Options"
                onMouseEnter={() => setHoverAnimation(true)}
                onMouseLeave={() => setHoverAnimation(false)}
              >
                <Stack align="center" justify="center">
                  <Stack w="60px" h="60px" align="center">
                    <MenuAnimation isMenuOpen={isMenuOpen} />
                  </Stack>
                </Stack>
              </MenuButton>
              <MenuList
                bg={isDark ? 'gray.800' : 'white'}
                border="none"
                boxShadow={isDark ? 'white 1px 2px 12px' : 'gray 1px 2px 12px'}
              >
                {menuItems.map(({ item, icon: Icon, to, id }) => (
                  <Link href={to} key={id}>
                    <MenuItem
                      fontWeight="bold"
                      icon={<Icon fontSize="15" />}
                      bg={isDark ? 'gray.800' : 'white'}
                      _hover={{
                        bgColor: isDark ? 'gray.900' : 'gray.50',
                      }}
                    >
                      {item}
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <List as="nav">
            <Stack
              spacing="4"
              direction="row"
              as="ul"
              align="center"
              justify="center"
            >
              {menuItems.map(({ item, icon, to, id }) => (
                <Link href={to} key={id}>
                  <ListItem
                    fontSize="lg"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    justifyItems="center"
                    transition="background-color .2s"
                    px="4"
                    py="1"
                    rounded="base"
                    _hover={{ bgColor: isDark ? 'gray.700' : 'gray.50' }}
                  >
                    <ListIcon
                      as={icon}
                      color={isDark ? 'pink.500' : 'pink.600'}
                    />
                    <Text>{item.toUpperCase()}</Text>
                  </ListItem>
                </Link>
              ))}
            </Stack>
          </List>
        )}
      </Stack>

      {/* <ToggleThemeButton /> */}
    </Flex>
  );
};

export default Header;
