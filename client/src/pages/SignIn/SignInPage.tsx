import React from 'react';
import { Button, TextInput, PasswordInput, Group, Box } from '@mantine/core';
import { useAppDispatch } from '../../shared/lib/hooks';
import { loginThunk } from '../../enteties/User/model/authThunk';
import type { LoginForm } from '../../enteties/User/model/types';

export default function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Box maw={300} mx="auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.currentTarget));
          void dispatch(loginThunk(formData as LoginForm));
        }}
      >
        <TextInput label="Email" placeholder="Email" name="email" />

        <PasswordInput label="Пароль" placeholder="Пароль" name="password" mt="md" />

        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
