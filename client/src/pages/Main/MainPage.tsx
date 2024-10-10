/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from 'react';
import { Button, Group, Grid, Container, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css'; // Импортируем модульные стили

export default function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const [brightness, setBrightness] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleBrightness = (): void => {
    setBrightness((prevBrightness) => (prevBrightness === 1 ? 0.5 : 1));
  };

  const playMusic = async (): Promise<void> => {
    if (audioRef.current) {
      try {
        if (!isPlaying) {
          audioRef.current.volume = 0.06;
          await audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } catch (error) {
        console.error('Ошибка при воспроизведении аудио:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.lights}
        style={{
          '--brightness': brightness,
        } as React.CSSProperties}
      />

      <div className={styles.textContainer}>
        <Container size="lg">
          <Grid justify="center" align="center" gutter="lg">
            <Grid.Col span={6} className={styles.centerText} onClick={() => void playMusic()}>
              <img
                src="../../../public/img/Plastinka-2.PNG"
                alt="Spinning Vinyl"
                className={styles.spinningVinyl}
              />
            </Grid.Col>

            <Grid.Col span={10}>
              <div className={styles.centerText}>
                <Title order={1} className={styles.titleMain}>
                  ШАНСООКЕ
                </Title>

                <Text size="lg" className={styles.textDescription}>
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
                    className={styles.buttonPrimary}
                  >
                    Войти
                  </Button>

                  <Button
                    size="md"
                    onClick={() => navigate('/signup')}
                    variant="gradient"
                    gradient={{ from: '#ffcc00', to: '#ff9900', deg: 105 }}
                    radius="lg"
                    className={styles.buttonSecondary}
                  >
                    Зарегистрироваться
                  </Button>
                </Group>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </div>

      <button onClick={toggleBrightness} className={styles.fixedButton} type="button">
        <img
          className={styles.fixedButton}
          src={brightness === 1 ? '../../public/img/toggleOn.png' : '../../public/img/toggleOf.png'}
          alt={brightness === 1 ? 'Выключить свет' : 'Включить свет'}
        />
      </button>

      <audio
        ref={audioRef}
        src="../../public/mainPage/mikhail-krug-vladimirskijj-central.mp3"
        loop
      />
    </div>
  );
}
