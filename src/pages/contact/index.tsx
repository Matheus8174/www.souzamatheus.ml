import React from 'react';

import {
  Text,
  Button,
  LightMode,
  VStack,
  useToast,
  Box,
  chakra,
  HStack,
  useColorModeValue,
  TextProps,
  Stack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { z } from 'zod';

import { useForm as formspreeUseForm } from '@formspree/react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from '@components/FormInput';
import MailAnimation from '../../animations/MailAnimation';

const InputSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'o nome precisa ter no minimo 5 caracteres' }),

  email: z.string().email({
    message: 'precisa ser um email válido',
  }),
  subject: z.string().min(5, {
    message: 'o assunto precisa ter no minimo 5 caracteres',
  }),
  message: z.string().min(20, {
    message: 'a mensagem precisa ter no minimo 20 caracteres',
  }),
});

export type InputData = z.infer<typeof InputSchema>;

const Title = (props: TextProps) => {
  return (
    <Text as="h1" mb="6" fontSize="3xl" fontWeight="bold" {...props}>
      Entre em contato
    </Text>
  );
};

function Contact() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<InputData>({
    resolver: zodResolver(InputSchema),
  });

  const [state, handleSubmitFormspree] = formspreeUseForm(
    process.env.NEXT_PUBLIC_FORMSPREE_HASHID as string,
    { data: { subject: getValues().subject } },
  );

  async function handleForm(inputData: InputData) {
    const { response } = await handleSubmitFormspree(inputData);

    if (response.ok) {
      reset();

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
    <Stack
      align="center"
      justify="center"
      w="100%"
      direction={{
        base: 'column',
        lg: 'row',
      }}
    >
      <Head>
        <title>Contato | Matheus Araújo</title>
      </Head>

      <Title
        display={{
          base: 'block',
          lg: 'none',
        }}
      />

      <HStack
        rounded="lg"
        bg={useColorModeValue('gray.100', 'gray.900')}
        align="center"
        display={{
          base: 'none',
          lg: 'flex',
        }}
        justify="center"
        w="lg"
        h="full"
      >
        <Box w="400px" h="400px">
          <MailAnimation />
        </Box>
      </HStack>
      <HStack
        px="6"
        justify={{ base: 'center', lg: 'start' }}
        align="center"
        minW={{
          base: '100%',
          lg: 'lg',
        }}
      >
        <chakra.form w="full" as="form" onSubmit={handleSubmit(handleForm)}>
          <Title
            display={{
              base: 'none',
              lg: 'block',
            }}
          />

          <VStack spacing="4" w="100%">
            <FormInput
              inputName="name"
              errors={errors.name}
              label="Nome:"
              type="text"
              placeholder="Seu nome"
              variant="filled"
              register={register}
            />
            <FormInput
              inputName="email"
              errors={errors.email}
              label="Email:"
              type="email"
              placeholder="Digite seu e-mail"
              variant="filled"
              helperText="seu e-mail não será compartilhado."
              register={register}
            />
            <FormInput
              inputName="subject"
              errors={errors.subject}
              label="Assunto:"
              type="text"
              placeholder="Assunto da mensagem"
              variant="filled"
              register={register}
            />
            <FormInput
              inputName="message"
              errors={errors.message}
              label="Mensagem:"
              type="text"
              placeholder="Conteúdo da mensagem"
              variant="filled"
              register={register}
            />

            <Box minW="100%">
              <HStack align="center" justify="end">
                <LightMode>
                  <Button
                    minW="100%"
                    title="submit"
                    disabled={state.submitting}
                    type="submit"
                    colorScheme="pink"
                    mt="4"
                  >
                    ENVIAR
                  </Button>
                </LightMode>
              </HStack>
            </Box>
          </VStack>
        </chakra.form>
      </HStack>
    </Stack>
  );
}

export default Contact;
