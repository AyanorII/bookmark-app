import { Form, Link } from '@adonisjs/inertia/react'
import {
  Button,
  Card,
  Container,
  Divider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { FaGithub } from 'react-icons/fa6'
import { urlFor } from '~/client'
import { Logo } from '~/components/Logo'

export default function Signup() {
  return (
    <Container h="100dvh">
      <Stack justify="center" align="center" h="100%">
        <Card withBorder px={32} py={40} bg="white" radius={12} maw={500}>
          <Logo />
          <Stack mt={32} gap={8} mb={32}>
            <Title order={1} size="xl">
              Create your account
            </Title>
            <Text c="dimmed" size="sm">
              Join us and start saving your favorite links — organized, searchable, and always
              within reach.
            </Text>
          </Stack>
          <Form route="new_account.store">
            {({ errors, clearErrors }) => {
              return (
                <Stack>
                  <TextInput
                    onChange={() => {
                      if (errors.fullName) {
                        clearErrors('fullName')
                      }
                    }}
                    label="Full name"
                    name="fullName"
                    error={errors.fullName}
                  />
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
                  />
                  <PasswordInput
                    onChange={() => {
                      if (errors.passwordConfirmation) {
                        clearErrors('passwordConfirmation')
                      }
                    }}
                    label="Confirm Password"
                    name="passwordConfirmation"
                    error={errors.passwordConfirmation ? 'Passwords do not match' : errors.password}
                  />
                  <Button type="submit">Create account</Button>
                </Stack>
              )
            }}
          </Form>
          <Divider my={24} label="Or continue with" labelPosition="center" />
          <Button
            component="a"
            href={urlFor('github.redirect')}
            leftSection={<FaGithub />}
            color="dark"
          >
            GitHub
          </Button>
          <Text c="dimmed" size="sm" mt={24} ta="center">
            Already have an account?
            <Link
              route="session.create"
              className="font-semibold text-gray-800 ml-2 hover:underline"
            >
              Log in
            </Link>
          </Text>
        </Card>
      </Stack>
    </Container>
  )
}
