import { Container } from '@mantine/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../widgets/NavBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getOneSongThunk } from '../../enteties/Song/model/songThunk';

export default function OneSongPage(): JSX.Element {
  const oneSong = useAppSelector((store) => store.songs.oneSong);
  const dispatch = useAppDispatch();
  const params = useParams();
  console.log(oneSong);

  useEffect(() => {
    void dispatch(getOneSongThunk(Number(params.songId)));
  }, []);
  return (
    <Container>
      <NavBar />
    </Container>
  );
}
