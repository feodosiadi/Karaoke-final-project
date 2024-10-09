import React from 'react';
import { Button, TextInput, PasswordInput, Group, Box, Title } from '@mantine/core';
import { useAppDispatch } from '../../shared/lib/hooks';
import { signUpThunk } from '../../enteties/User/model/authThunk';
import type { SignUpForm } from '../../enteties/User/model/types';
import styles from './SignUpPage.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../enteties/User/model/authSlice';

export default function SignUpPage(): JSX.Element {
  const [passOne, setPassOne] = useState('');
  const [passSec, setPassSec] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passOne !== passSec) {
      setError('Пароли не совпадают');
    } else {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      void dispatch(signUpThunk(formData as SignUpForm));
      navigate('/genres');
      void dispatch(setLoading());
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lampStyle} />

      <Box className={styles.glowingBox}>
        <Title order={2} className={styles.centerText}>
          Регистрация
        </Title>
        <form onSubmit={signUpHandler}>
          <TextInput placeholder="Email" name="email" className={styles.inputStyle} size="lg" />

          <TextInput placeholder="Имя" name="name" className={styles.inputStyle} size="lg" />

          <PasswordInput
            placeholder="Пароль"
            name="password"
            className={styles.inputStyle}
            size="lg"
            onChange={(e) => setPassOne(e.currentTarget.value)}
          />

          <PasswordInput
            placeholder="Подтвердите пароль"
            className={styles.inputStyle}
            size="lg"
            onChange={(e) => {
              setPassSec(e.currentTarget.value);
              if (passOne !== e.currentTarget.value) {
                setError('Пароли не совпадают');
              } else {
                setError('');
              }
            }}
            error={error}
          />

          <Group mt="md">
            <Button type="submit" className={styles.buttonPrimary} fullWidth>
              Регистрация
            </Button>
          </Group>

          <Group mt="md">
            <Button className={styles.buttonSecondary} onClick={() => navigate('/')} fullWidth>
              На главную
            </Button>
          </Group>
        </form>
      </Box>

      <div className={styles.bottomLampStyle} />
    </div>
  );
}
