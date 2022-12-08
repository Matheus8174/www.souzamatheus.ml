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
import Head from 'next/head';

type InputData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function Contact() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const toast = useToast();
  const [inputData, setInputData] = React.useState<InputData>({
    name: '',
    email: '',
    message: '',
    subject: '',
  });

  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_HASHID as string,
    { data: { subject: inputData.subject } },
  );

  const handleInputData = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setInputData((prev) => ({ ...prev, [target.id]: target.value }));

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { response } = await handleSubmit(inputData);

    if (response.ok) {
      formRef.current?.reset();

      toast({
        title: '🚀 E-mail enviado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: '😓 Erro ao enviar o e-mail',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <VStack spacing="6" align="center" w="100%">
      <Head>
        <title>Contato | Matheus Araújo</title>
      </Head>
      <Text
        as="h1"
        fontSize={{
          base: '3xl',
        }}
        fontWeight="bold"
      >
        Entre em contato
      </Text>

      <chakra.form
        ref={formRef}
        w={{
          base: '100%',
          md: 'xl',
        }}
        px="6"
        as="form"
        onSubmit={handleForm}
      >
        <VStack spacing="4" w="100%">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Nome:</FormLabel>
            <Input
              id="name"
              type="text"
              variant="filled"
              onChange={handleInputData}
              isRequired
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              id="email"
              type="email"
              variant="filled"
              isRequired
              onChange={handleInputData}
            />

            <FormHelperText>seu e-mail não será compartilhado.</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="subject">Assunto:</FormLabel>
            <Input
              id="subject"
              type="text"
              variant="filled"
              isRequired
              onChange={handleInputData}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="message">Mensagem:</FormLabel>
            <Input
              id="message"
              type="text"
              variant="filled"
              isRequired
              onChange={handleInputData}
            />
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
