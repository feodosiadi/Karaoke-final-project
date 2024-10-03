import React from 'react';
import { Button, TextInput, PasswordInput, Group, Box } from '@mantine/core';
import { useAppDispatch } from '../../shared/lib/hooks';
import { signUpThunk } from '../../enteties/User/model/authThunk';
import type { SignUpForm } from '../../enteties/User/model/types';

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Box maw={300} mx="auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.currentTarget));
          void dispatch(signUpThunk(formData as SignUpForm));
        }}
      >
        <TextInput label="Email" placeholder="Email" name="email" />

        <TextInput label="Name" placeholder="Имя" name="name" />

        <PasswordInput label="Password" placeholder="Пароль" name="password" mt="md" />

        <Group mt="md">
          <Button type="submit">Sign Up</Button>
        </Group>
      </form>
    </Box>
  );
}
