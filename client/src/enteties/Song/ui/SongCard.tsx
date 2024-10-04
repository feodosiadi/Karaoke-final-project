import React from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { SongType } from '../model/types';

type SongT = {
  song: SongType;
};

export default function SongCard({ song }: SongT): JSX.Element {
  const navigate = useNavigate();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={`/${song.img}`} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{song.name}</Text>
      </Group>
      <Button color="blue" fullWidth mt="md" radius="md" onClick={() => navigate(`/songs/${song.id}`)}>
        Спеть песню
      </Button>
    </Card>
  );
}
