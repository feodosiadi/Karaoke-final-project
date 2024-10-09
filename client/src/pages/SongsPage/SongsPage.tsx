/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAllSongsByGenreThunk } from '../../enteties/Song/model/songThunk';
import NavBar from '../../widgets/NavBar/NavBar';
import styles from './SongsPage.module.css';
import type { SongType } from '../../enteties/Song/model/types';
import ErrorPage from '../Error/ErrorPage';
import Slider from '../../widgets/slider/slider';

export default function SongsPage(): JSX.Element {
  const songsByGenre = useAppSelector((store) => store.songs.songsByGenre);
  const error = useAppSelector((store) => store.songs.error);
  const dispatch = useAppDispatch();
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [audio] = useState(new Audio());
  const imagePaths = ['/ads/avito.jpg', '/ads/curds.jpg', '/ads/pizza.jpg'];

  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    void dispatch(getAllSongsByGenreThunk(Number(genreId)));
  }, [dispatch, genreId]);

  const handlePlaySongAndNavigate = (songId: SongType['id']): void => {
    audio.src = '/public/songsPage/insert-casset.mp3';
    audio
      .play()
      .then(() => {
        audio.onended = () => {
          navigate(`/songs/${songId}`);
        };
      })
      .catch((playError) => {
        console.error('Ошибка воспроизведения:', playError);
      });
  };

  const handleImageClick = (): void => {
    setIsImageVisible(false);
    setTimeout(() => {
      setIsImageVisible(true);
    }, 3000);
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <Container className={styles.contentContainer}>
        <Slider songsByGenre={songsByGenre} handlePlaySongAndNavigate={handlePlaySongAndNavigate} />
        {songsByGenre[0]?.Genre?.name === 'Всякое' && (
          <div className={styles.bottomContainer}>
            {isImageVisible && (
              <img
                className={styles.ads}
                src={`/public/${imagePaths[Math.floor(Math.random() * imagePaths.length)]}`}
                alt="ads"
                onClick={handleImageClick}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
