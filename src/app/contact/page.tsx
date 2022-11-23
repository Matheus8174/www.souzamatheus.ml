'use client';

import React from 'react';

import {
  Text,
  Button,
  LightMode,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Box,
  FormHelperText,
  chakra,
} from '@chakra-ui/react';
import { useForm } from '@formspree/react';

function Contact() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const toast = useToast();

  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_HASHID as string,
    { data: { subject: 'Nova mensagem do blog!' } },
  );

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { response } = await handleSubmit(e);

      if (response.ok) {
        // formRef.current?.reset();

        toast({
          title: '🚀 E-mail enviado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (erro) {
      toast({
        title: '😓 Erro ao enviar o e-mail',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    console.log(state);
  }

  return (
    <VStack spacing="6" align="center">
      <Text
        as="h1"
        fontSize={{
          base: '2xl',
          md: '3xl',
          lg: '4xl',
        }}
        fontWeight="bold"
      >
        Entre em contato
      </Text>

      <chakra.form
        ref={formRef}
        minW={{
          base: 'sm',
          md: 'lg',
          lg: 'xl',
        }}
        as="form"
        onSubmit={handleForm}
      >
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Nome:</FormLabel>
            <Input id="name" type="text" variant="filled" isRequired />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input id="email" type="email" variant="filled" isRequired />

            <FormHelperText>seu e-mail não será compartilhado.</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="subject">Assunto:</FormLabel>
            <Input id="subject" type="text" variant="filled" isRequired />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="message">Mensagem:</FormLabel>
            <Input id="message" type="text" variant="filled" isRequired />
          </FormControl>
          <Box>
            <LightMode>
              <Button
                disabled={state.submitting}
                type="submit"
                colorScheme="pink"
                mt="4"
              >
                ENVIAR
              </Button>
            </LightMode>
          </Box>
        </VStack>
      </chakra.form>
    </VStack>
  );
}

export default Contact;
