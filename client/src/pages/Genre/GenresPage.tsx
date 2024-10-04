import { Container, Grid } from '@mantine/core';
import React from 'react';
import NavBar from '../../widgets/NavBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { useEffect } from 'react';
import { getAllGenresThunk } from '../../enteties/Genre/model/genreThunk';
import GenreCard from '../../enteties/Genre/ui/GenreCard';

export default function GenresPage(): JSX.Element {
  const genres = useAppSelector((store) => store.songs.genre);
  const dispatch = useAppDispatch();
  console.log(genres);

  useEffect(() => {
    dispatch(getAllGenresThunk());
  }, []);

  return (
    <Container>
      <NavBar />
      {genres.map((genre) => (
        <Grid key={genre.id}>
          <GenreCard genre={genre} />
        </Grid>
      ))}
    </Container>
  );
}
