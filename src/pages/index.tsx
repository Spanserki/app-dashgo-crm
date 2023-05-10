import { Button, Flex, FormControl, FormErrorMessage, Heading, Input } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import * as yup from 'yup';
import { AuthContext } from "../context/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

type SigninFormData = {
  email: string;
  password: string;
}

const handleSchemaValidation = yup.object().shape({
  email: yup.string().required('Campo obrigatório').email('Formato de e-mail com @'),
  password: yup.string().required('Campo obrigatório')
})

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<SigninFormData>({
    resolver: yupResolver(handleSchemaValidation)
  });

  const handleSignIn: SubmitHandler<any> = async values => {

    await signIn(values)

  }

  return (
    <Flex
      flexDir='column'
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        align='end'
        pb={10}
      >
        <Heading
        >
          DashGoCRM
        </Heading>

        <Heading color='green.500' ml={1}>.</Heading>
      </Flex>

      <Flex
        as='form'
        onSubmit={handleSubmit(handleSignIn)}
        flexDir='column'
        w='100%'
        maxW={400}
        bgColor='gray.800'
        padding={8}
        borderRadius={8}
      >
        <FormControl isInvalid={!!errors.email?.message}>
          <Input
            placeholder="E-mail"
            focusBorderColor="green.500"
            border={0}
            bgColor='gray.900'
            {...register('email')}
          />

          {!!errors.email?.message && <FormErrorMessage>{`${errors.email.message}`}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.password?.message}>
          <Input
            type='password'
            placeholder="Senha"
            focusBorderColor="green.500"
            border={0}
            bgColor='gray.900'
            {...register('password')}
            mt={5}
          />

          {!!errors.password?.message && <FormErrorMessage>{`${errors.password.message}`}</FormErrorMessage>}
        </FormControl>

        <Button
          type="submit"
          mt={10}
          bgColor='green.600'
          transition='0.3s'
          _hover={{ opacity: '0.7' }}
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { 'token_client': token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}