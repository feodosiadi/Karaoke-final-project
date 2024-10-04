import React, { useEffect } from 'react';
import { Container, Grid } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import SongCard from '../../enteties/Song/ui/SongCard';
import { getAllSongsByGenreThunk } from '../../enteties/Song/model/songThunk';
import NavBar from '../../widgets/NavBar/NavBar';

export default function SongsPage(): JSX.Element {
  const songsByGenre = useAppSelector((store) => store.songs.songsByGenre);
  const dispatch = useAppDispatch();
  const { genreId } = useParams();
  

  useEffect(() => {
    void dispatch(getAllSongsByGenreThunk(Number(genreId)));
  }, []);

  console.log(songsByGenre);
  

  return (
    <Container>
      <NavBar />
      {songsByGenre.map((song) => (
        <Grid key={song.id}>
          <SongCard song={song} />
        </Grid>
      ))}
    </Container>
  );
}
