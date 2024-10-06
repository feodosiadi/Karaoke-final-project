// import { Container } from '@mantine/core';
// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import NavBar from '../../widgets/NavBar/NavBar';
// import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
// import { getOneSongThunk } from '../../enteties/Song/model/songThunk';

// export default function OneSongPage(): JSX.Element {
//   const oneSong = useAppSelector((store) => store.songs.oneSong);
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   console.log(oneSong);

//   useEffect(() => {
//     void dispatch(getOneSongThunk(Number(params.songId)));
//   }, [dispatch, params.songId]);
//   return (
//     <Container>
//       <NavBar />
//     </Container>
//   );
// }

/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Container, Title, Group } from '@mantine/core';
import React, { useRef, useState } from 'react';

export default function SongPage(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.play();
      audioRef.current.play();
      setHasStarted(true); // После начала воспроизведения показать кнопку "Заново"
    }
  };

  const handleRestart = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.currentTime = 0;
      audioRef.current.currentTime = 0;
      videoRef.current.play();
      audioRef.current.play();
    }
  };

  return (
    <Container>
      <Title order={1} mb="lg" style={{ textAlign: 'center' }}>
        Город Сочи Караоке
      </Title>

      {/* ВИДЕО БЕЗ ЗВУКА */}
      <video
        ref={videoRef}
        src="/SochiKaraoke.mp4"
        width="100%"
        muted
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          setHasStarted(false); // Скрыть кнопку "Заново", когда видео закончится
        }}
        style={{ marginBottom: '20px', display: 'block' }}
      >
        Ваш браузер не поддерживает тег video.
      </video>

      {/* АУДИО МИНУСОВКА */}
      <audio ref={audioRef} src="/SochiMinus.mp3" />

      <Group justify="center" align="center" mt="md">
        {/* КНОПКА ДЛЯ ВОСПРОИЗВЕДЕНИЯ */}
        {!hasStarted ? (
          <Button
            fullWidth
            size="lg"
            onClick={handlePlay}
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          >
            Петь
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={handleRestart}
            variant="gradient"
            gradient={{ from: 'orange', to: 'red', deg: 105 }}
          >
            Заново
          </Button>
        )}
      </Group>
    </Container>
  );
}
