import React, { useRef, useState } from 'react';
import { Button, Group, Grid, Container, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './MainPage.style.css';

export default function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const [brightness, setBrightness] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleBrightness = () => {
    setBrightness((prevBrightness) => (prevBrightness === 1 ? 0.5 : 1));
  };

  const playMusic = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.volume = 0.06;
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="container">
      <div
        className="lights"
        style={{
          '--brightness': brightness,
        }}
      />

      <div className="text-container">
        <Container size="lg">
          <Grid justify="center" align="center" gutter="lg">
            <Grid.Col span={6} className="center-text" onClick={playMusic}>
              <img
                src="../../../public/img/Plastinka.PNG"
                alt="Spinning Vinyl"
                className="spinning-vinyl"
              />
            </Grid.Col>

            <Grid.Col span={10}>
              <div className="center-text">
                <Title order={1} className="title-main">
                  ШАНСООКЕ
                </Title>

                <Text size="lg" className="text-description">
                  Добро пожаловать в наш караоке-клуб! 🎤
                  <br />
                  Здесь вы можете исполнить свои любимые песни и посоревноваться с друзьями! 🏆
                  Выбирайте трек, пойте в своё удовольствие и получите баллы за точность исполнения.
                </Text>

                <Group>
                  <Button
                    size="md"
                    onClick={() => navigate('/signin')}
                    variant="gradient"
                    gradient={{ from: '#ffcc00', to: '#ff9900', deg: 105 }}
                    radius="lg"
                    className="button-primary"
                  >
                    Войти
                  </Button>

                  <Button
                    size="md"
                    onClick={() => navigate('/signup')}
                    variant="gradient"
                    gradient={{ from: '#ffcc00', to: '#ff9900', deg: 105 }}
                    radius="lg"
                    className="button-secondary"
                  >
                    Зарегистрироваться
                  </Button>
                </Group>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </div>

      <img
        onClick={toggleBrightness}
        className="fixed-button"
        src={brightness === 1 ? '../../public/img/toggleOn.png' : '../../public/img/toggleOf.png'}
        alt={brightness === 1 ? 'Выключить свет' : 'Включить свет'}
      />

      <audio
        ref={audioRef}
        src="../../public/mainPage/mikhail-krug-vladimirskijj-central.mp3"
        loop
      />
    </div>
  );
}
