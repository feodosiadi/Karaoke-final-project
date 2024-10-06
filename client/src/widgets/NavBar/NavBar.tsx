import React from 'react';
import { Container, Group, Button, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../shared/lib/hooks';
import { logoutThunk } from '../../enteties/User/model/authThunk';

export default function NavBar(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const icon = <IconLogout size={14} />;

  return (
    <Container
      style={{ backgroundColor: '#A9A9A9', padding: '10px', display: 'flex', alignItems: 'center' }}
    >
      <Text weight={700} size="xl" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        ШАНСООКЕ
      </Text>

      <Group spacing="sm" style={{ marginLeft: 'auto' }}>
        <Button variant="subtle" onClick={() => navigate('/genres')}>
          Жанры
        </Button>
        <Button variant="subtle" onClick={() => navigate('/leaders')}>
          Таблица лидеров
        </Button>
        <Button
          justify="center"
          // rightSection={icon}
          variant="filled"
          color="red"
          onClick={() => dispatch(logoutThunk())}
        >
          Выйти
        </Button>
      </Group>
    </Container>
  );
}
