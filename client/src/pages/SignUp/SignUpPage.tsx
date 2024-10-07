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
  const navigate = useNavigate()

  const signUpHandler = (e) => {
    e.preventDefault();
    if (passOne !== passSec) {
      setError('Пароли не совпадают');
    } else {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      void dispatch(signUpThunk(formData as SignUpForm));
      navigate('/genres')
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

          <Group mt="md" position="center">
            <Button type="submit" className="button-primary">
              Регистрация
            </Button>
          </Group>
          <Group mt="sm" justify="center" align="center">
            <Button
              onClick={() => navigate('/')} // Навигация на главную страницу
              variant="transparent"
              color='red'
              size="sm" // Маленькая кнопка
              style={{
                backgroundColor: 'black', // Серый цвет
                fontSize: '12px', // Маленький текст
                borderRadius: '4px', // Немного закругляем углы
                padding: '5px 10px',
              }}
            >
              Вернуться на главную
            </Button>
          </Group>
        </form>
      </Box>
    </Box>
  );
}
