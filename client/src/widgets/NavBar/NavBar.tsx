import React from 'react';
import { Group, Button, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../shared/lib/hooks';
import { logoutThunk } from '../../enteties/User/model/authThunk';
import './NavBar.style.css';

export default function NavBar(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const icon = <IconLogout size={14} />;

  return (
    <div className="nav-container">
      <Text
        className="nav-title"
        // weight={700}
        size="xl"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        ШАНСООКЕ
      </Text>

      <Group className='nav-buttons'>
        <Button className="custom-button" variant="subtle" onClick={() => navigate('/genres')}>
          Жанры
        </Button>
        <Button className="custom-button" variant="subtle" onClick={() => navigate('/leaderboard')}>
          Таблица лидеров
        </Button>
        <Button
          className="custom-button logout-button"
          justify="center"
          variant="filled"
          color="red"
          onClick={() => void dispatch(logoutThunk())}
        >
          Выйти
        </Button>
      </Group>
    </div>
  );
}
