import React from 'react';
import { GenreT } from '../model/types';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type GenreCard = {
  genre: GenreT;
};

export default function GenreCard({ genre }: GenreCard): JSX.Element {
    const navigate = useNavigate()
  return (
    <Button variant="filled" color="yellow" size="xl" radius="md" onClick={() => {navigate(`/genres/${genre.id}/songs`)}}>
      {genre.name}
    </Button>
  );
}
