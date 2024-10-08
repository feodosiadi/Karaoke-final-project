import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAllSongsByGenreThunk } from '../../enteties/Song/model/songThunk';
import NavBar from '../../widgets/NavBar/NavBar';
import styles from './SongsPage.module.css';
import type { SongType } from '../../enteties/Song/model/types';

export default function SongsPage(): JSX.Element {
  const songsByGenre = useAppSelector((store) => store.songs.songsByGenre);
  const dispatch = useAppDispatch();
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [audio] = useState(new Audio());

  useEffect(() => {
    void dispatch(getAllSongsByGenreThunk(Number(genreId)));
  }, [dispatch, genreId]);

  const handlePlaySongAndNavigate = (songId: SongType['id']): void => {
    audio.src = '../../../public/songsPage/insert-casset.mp3';
    audio
      .play()
      .then(() => {
        audio.onended = () => {
          navigate(`/songs/${songId}`);
        };
      })
      .catch((error) => {
        console.error('Ошибка воспроизведения:', error);
      });
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <Container className={styles.contentContainer}>
        {songsByGenre.map((song) => (
          <Grid key={song.id} className={styles.gridItem}>
            <button className={styles.casset} type="button" onClick={() => handlePlaySongAndNavigate(song.id)}>
              <img src={`/public/${song.img}`} alt={song.name} />
            </button>
          </Grid>
        ))}
      </Container>
    </div>
  );
}
