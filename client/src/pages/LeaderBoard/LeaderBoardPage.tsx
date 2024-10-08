import React, { useEffect } from 'react';
import NavBar from '../../widgets/NavBar/NavBar';
import { Container, Table } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAllLeadersThunk } from '../../enteties/Leaders/model/leaderThunk';
import './LeaderBoardPage.css'; // Импортируйте стили

export default function LeaderBoardPage(): JSX.Element {
  const allLeaders = useAppSelector((store) => store.songs.allLeaders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllLeadersThunk());
  }, [dispatch]);

  return (
    <div style={{ color: 'white' }}>
      <NavBar />
      <Container className="table-container">
        <Table className="table" stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Номер</Table.Th>
              <Table.Th>Имя пользователя</Table.Th>
              <Table.Th>ТОП Песня</Table.Th>
              <Table.Th>Наилучший результат</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {allLeaders.map((onesong, index) => (
              <Table.Tr key={onesong.id}>
                <Table.Td>{index}</Table.Td>
                <Table.Td>{onesong.User.name}</Table.Td>
                <Table.Td>{onesong.Song.name}</Table.Td>
                <Table.Td>{onesong.score}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
          <Table.Caption>Scroll page to see sticky thead</Table.Caption>
        </Table>
      </Container>
    </div>
  );
}
