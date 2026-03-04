import { Form, Link } from '@adonisjs/inertia/react'
import {
  Button,
  Card,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { Logo } from '~/components/Logo'

export default function Login() {
  return (
    <Container h="100dvh">
      <Stack justify="center" align="center" h="100%">
        <Card withBorder px={32} py={40} bg="white" radius={12} w="100%" maw={500}>
          <Logo />
          <Stack mt={32} gap={8} mb={32}>
            <Title order={1} size="xl">
              Log in to your account
            </Title>
            <Text c="dimmed" size="sm">
              Welcome back! Please enter your details.
            </Text>
          </Stack>
          <Form route="session.store">
            {({ errors, clearErrors }) => {
              console.log('🚀 ~ Login ~ errors:', errors)
              return (
                <Stack>
                  <TextInput
                    onChange={() => {
                      if (errors.email) {
                        clearErrors('email')
                      }
                    }}
                    label="Email address"
                    type="email"
                    name="email"
                    error={errors.email}
                    required
                  />
                  <PasswordInput
                    onChange={() => {
                      if (errors.password) {
                        clearErrors('password')
                      }
                    }}
                    label="Password"
                    name="password"
                    error={errors.password}
                    required
                  />
                  <Button type="submit">Log in</Button>
                </Stack>
              )
            }}
          </Form>
          {/* TODO: Add forgot password link */}
          <Text c="dimmed" size="sm" mt={24} ta="center">
            Don't have an account?
            <Link
              route="new_account.create"
              className="font-semibold text-gray-800 ml-2 hover:underline"
            >
              Sign up
            </Link>
          </Text>
        </Card>
      </Stack>
    </Container>
  )
}
