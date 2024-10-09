import React from 'react';
import { Button, TextInput, PasswordInput, Group, Box, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../shared/lib/hooks';
import { loginThunk } from '../../enteties/User/model/authThunk';
import type { LoginForm } from '../../enteties/User/model/types';
import { setLoading } from '../../enteties/User/model/authSlice';
import styles from './SignInPage.module.css'; // Импорт модуля CSS

export default function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.lampStyle} />

      <Box className={styles.glowingBox}>
        <Title order={1} className={styles.centerText}>
          Войти
        </Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.currentTarget));
            void dispatch(loginThunk(formData as LoginForm));
            navigate('/genres');
            void dispatch(setLoading());
          }}
        >
          <TextInput
            placeholder="Email"
            name="email"
            size="lg"
            className={styles.inputStyle}
          />
          <PasswordInput
            placeholder="Пароль"
            name="password"
            mt="md"
            size="lg"
            className={styles.inputStyle}
          />

          <Group mt="md" justify="center" align="center">
            <Button
              type="submit"
              size="xl"
              className={styles.buttonPrimary}
              fullWidth
            >
              Войти
            </Button>
          </Group>

          <Group mt="md" justify="center" align="center">
            <Button
              onClick={() => navigate('/')}
              size="xl"
              className={styles.buttonSecondary}
              fullWidth
            >
              На главную
            </Button>
          </Group>
        </form>
      </Box>

      <div className={styles.bottomLampStyle} />
    </div>
  );
}
