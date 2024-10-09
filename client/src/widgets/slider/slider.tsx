import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import type { SongType } from '../../enteties/Song/model/types';

type SongsByGenreType = {
  songsByGenre: SongType[];
  handlePlaySongAndNavigate: (songId: SongType["id"]) => void;
};

function Slider({ songsByGenre, handlePlaySongAndNavigate }: SongsByGenreType): JSX.Element {
  return (
    <Carousel  indicators={false} interval={6000}>
      {songsByGenre.map((song) => (
        <Carousel.Item key={song?.id} onClick={() => handlePlaySongAndNavigate(song?.id)} style={{cursor: 'pointer'}}>
          <img style={{width: 700}} src={`/public/${song?.img}`} alt={song?.name} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
