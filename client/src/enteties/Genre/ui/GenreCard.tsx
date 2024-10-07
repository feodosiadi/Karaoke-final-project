import React from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { GenreT } from '../model/types';

type GenreCardType = {
  genre: GenreT;
};

export default function GenreCard({ genre }: GenreCardType): JSX.Element {
  console.log(genre);

  const navigate = useNavigate();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section style={{marginBottom: 10}}>
        <Image src={`/public/${genre.img}`} height={160} style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} alt="Norway" />
      </Card.Section>
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
    </Card>
  );
}
