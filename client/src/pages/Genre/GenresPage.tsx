import { Container, Grid } from '@mantine/core';
import React, { useEffect } from 'react';
import NavBar from '../../widgets/NavBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAllGenresThunk } from '../../enteties/Genre/model/genreThunk';
import GenreCard from '../../enteties/Genre/ui/GenreCard';
import './GenresPage.style.css';

export default function GenresPage(): JSX.Element {
  const genres = useAppSelector((store) => store.songs.genre);
  const dispatch = useAppDispatch();
  console.log(genres);

  useEffect(() => {
    void dispatch(getAllGenresThunk());
  }, [dispatch]);

  return (
    <Container className="genres-page-container">
      <NavBar />
      {genres.map((genre) => (
        <Grid key={genre.id}>
          <GenreCard genre={genre} />
        </Grid>
      ))}
    </Container>
  );
}
