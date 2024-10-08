import React from 'react';
import { Button, TextInput, PasswordInput, Group, Box, Title } from '@mantine/core';
import { useAppDispatch } from '../../shared/lib/hooks';
import { signUpThunk } from '../../enteties/User/model/authThunk';
import type { SignUpForm } from '../../enteties/User/model/types';
import './SignUpPage.style.css'; // Подключаем файл со стилями
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage(): JSX.Element {
  const [passOne, setPassOne] = useState('');
  const [passSec, setPassSec] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signUpHandler = (e) => {
    e.preventDefault();
    if (passOne !== passSec) {
      setError('Пароли не совпадают');
    } else {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      void dispatch(signUpThunk(formData as SignUpForm));
      navigate('/genres');
    }
  };

  return (
    <Box className="container">
      <Box className="glowing-box" maw={400} mx="auto" p={30}>
        <Title order={2} align="center" className="center-text">
          Регистрация
        </Title>
        <form onSubmit={(e) => signUpHandler(e)}>
          <TextInput
            label="Email"
            placeholder="Email"
            name="email"
            className="input-style"
            required
          />

          <TextInput label="Имя" placeholder="Имя" name="name" className="input-style" required />

          <PasswordInput
            label="Пароль"
            placeholder="Пароль"
            name="password"
            mt="md"
            className="input-style"
            onChange={(e) => setPassOne(e.currentTarget.value)}
            required
          />

          <PasswordInput
            label="Повторить пароль"
            placeholder="Пароль"
            mt="md"
            className="input-style"
            onChange={(e) => {
              setPassSec(e.currentTarget.value);
              if (passOne !== e.currentTarget.value) {
                setError('Пароли не совпадают');
              } else if (passSec.length === 0) {
                setError('');
              } else if (passOne.length === 0) {
                setError('');
              } else {
                setError('');
              }
            }}
            error={error}
            required
          />

          <Group mt="md" justify="center" align="center">
            <Button
              type="submit"
              size="xl" // Увеличиваем кнопку
              sx={{
                display: 'block', // Явно указываем кнопке быть блочным элементом
                height: '10vh', // Используем vh для более явного управления высотой
                fontSize: '1.5rem', // Размер текста на кнопке
                borderRadius: '2%', // Закругленные углы
              }}
              variant="gradient"
              gradient={{ from: '#ffcc00', to: '#ff9900', deg: 105 }}
              radius="lg"
              fullWidth
            >
              Регистрация
            </Button>
          </Group>
          <Group mt="md" justify="center" align="center">
            <Button
              type="submit"
              onClick={() => navigate('/')}
              size="xl" // Увеличиваем кнопку
              sx={{
                display: 'block', // Явно указываем кнопке быть блочным элементом
                height: '10vh', // Используем vh для более явного управления высотой
                fontSize: '1.5rem', // Размер текста на кнопке
                borderRadius: '2%', // Закругленные углы
              }}
              variant="gradient"
              gradient={{ from: '#d3d3d3', to: '#a9a9a9', deg: 105 }}
              radius="lg"
              fullWidth
            >
              На главную
            </Button>
          </Group>
        </form>
      </Box>
    </Box>
  );
}
