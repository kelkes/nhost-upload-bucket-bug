import { useState } from "react";
import { useSignInEmailPassword } from "@nhost/nextjs";
import { useRouter } from "next/router";
import {
  Input,
  Spinner,
  Container,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  if (isSuccess) {
    router.push((router.query.rd as string) || "/");
    return null;
  }

  const disableForm = isLoading || needsEmailVerification;

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Melde dich mit deinen Zugangsdaten an
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg-surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form onSubmit={handleOnSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">E-Mail Adresse</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={disableForm}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Passwort</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={disableForm}
                    required
                  />
                </FormControl>
              </Stack>

              <Button variant="primary" type="submit" disabled={disableForm}>
                {isLoading ? <Spinner size="sm" /> : "Anmelden"}
              </Button>

              {isError ? <p>{error?.message}</p> : null}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignIn;
