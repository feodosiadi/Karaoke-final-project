import React from 'react';
import { Button, TextInput, PasswordInput, Group, Box, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../shared/lib/hooks';
import { loginThunk } from '../../enteties/User/model/authThunk';
import type { LoginForm } from '../../enteties/User/model/types';
import { setLoading } from '../../enteties/User/model/authSlice';

export default function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const lampStyle = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '25%',
    backgroundImage: 'url(../../RegLamps.png)',
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'contain',
    filter: 'brightness(var(--brightness))',
    transition: 'filter 0.3s ease',
  };

  const bottomLampStyle = {
    ...lampStyle,
    top: 'unset',
    bottom: 0,
    transform: 'scaleY(-1)', 
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: 'black',
    color: 'white', 
  };

  return (
    <div style={containerStyle}>
      {/* Элемент с лампочками на фоне */}
      <div style={lampStyle} />

      {/* Центральная секция с формой */}
      <Box
        maw="50%" // Ширина формы относительно родителя
        mx="auto"
        className="center-text glowing-box"
        sx={(theme) => ({
          padding: theme.spacing.xl * 2, // Увеличиваем padding в 2 раза
          backgroundColor: theme.colors.dark[7],
          borderRadius: '5%', // Закругляем углы формы в процентах
          boxShadow: `0 0 5% 1% rgba(255, 255, 255, 0.8)`, // Свечение в процентах
          border: '0.5% solid white', // Белая рамка
          zIndex: 1, // Чтобы форма отображалась поверх фона с лампочками
          textAlign: 'center',
          position: 'relative', // Для правильного позиционирования
        })}
      >
        <Title order={1} sx={{ marginBottom: '4%', color: 'white', fontSize: '2rem' }}>
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
            sx={{
              height: '10%', // Высота инпута
              fontSize: '1.5rem', // Размер текста
              borderRadius: '2%', // Закругленные углы в процентах
              marginBottom: '4%',
            }}
            className="input-style"
          />
          <PasswordInput
            placeholder="Пароль"
            name="password"
            mt="md"
            size="lg"
            sx={{
              height: '10%', // Высота инпута
              fontSize: '1.5rem', // Размер текста
              borderRadius: '2%', // Закругленные углы в процентах
              marginBottom: '4%',
            }}
            className="input-style"
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
              Войти
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

      {/* Лампочки внизу страницы */}
      <div style={bottomLampStyle} />
    </div>
  );
}
