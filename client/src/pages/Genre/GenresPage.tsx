import { Container, Grid, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../widgets/NavBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAllGenresThunk } from '../../enteties/Genre/model/genreThunk';
import './GenresPage.style.css';

export default function GenresPage(): JSX.Element {
  const genres = useAppSelector((store) => store.songs.genre);
  const dispatch = useAppDispatch();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [imageClass, setImageClass] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(getAllGenresThunk());
  }, [dispatch]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="page-container">
      <NavBar />
      <Container className="genres-page-container">
        <Grid>
          {genres.map((genre) => (
            <Grid.Col span={12} key={genre.id}>
              <Text
                className="genre-item"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = getRandomColor();
                  if (genre.name.toLowerCase() === 'шансон') {
                    setHoveredImage('../../../public/genresPage/krug-genres.jpeg');
                    setImageClass('img-enter');
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                  if (genre.name.toLowerCase() === 'шансон') {
                    setImageClass('img-leave');
                    setTimeout(() => setHoveredImage(null), 500);
                  }
                }}
                onClick={() => {
                  navigate(`/genres/${genre.id}`);
                }}
              >
                {genre.name}
              </Text>
            </Grid.Col>
          ))}
        </Grid>
        {hoveredImage && (
          <div className={`hovered-image ${imageClass}`}>
            <img src={hoveredImage} alt="Hovered Genre" />
          </div>
        )}
        <div className={`microphone ${imageClass}`}>
          <img src="../../../public/genresPage/microphone.png" alt="Hovered Genre" />
        </div>
      </Container>
    </div>
  );
}
