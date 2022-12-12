import React from 'react';

import {
  Text,
  Button,
  LightMode,
  VStack,
  useToast,
  Box,
  chakra,
} from '@chakra-ui/react';
import Head from 'next/head';
import { z } from 'zod';

import { useForm as formspreeUseForm } from '@formspree/react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from '@components/FormInput';

const InputSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'o nome precisa ter no minimo 5 caracteres' })
    .nullable(),

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

function Contact() {
  const formRef = React.useRef<HTMLFormElement>(null);

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
        onSubmit={handleSubmit(handleForm)}
      >
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

          <Box>
            <LightMode>
              <Button
                title="submit"
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
