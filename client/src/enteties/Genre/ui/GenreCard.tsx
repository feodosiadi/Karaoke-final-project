import React from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { GenreT } from '../model/types';

type GenreCardType = {
  genre: GenreT;
};

export default function GenreCard({ genre }: GenreCardType): JSX.Element {
  console.log(genre);

  const navigate = useNavigate();
  return (
    <Button
      variant="filled"
      color="yellow"
      size="xl"
      radius="md"
      onClick={() => {
        navigate(`/genres/${genre.id}`);
      }}
    >
      {genre.name}
    </Button>
  );
}
