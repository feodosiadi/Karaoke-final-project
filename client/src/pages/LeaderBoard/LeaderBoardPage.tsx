import React, { useEffect } from 'react';
import { Container, Table } from '@mantine/core';
import NavBar from '../../widgets/NavBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAllLeadersThunk } from '../../enteties/Leaders/model/leaderThunk';
import styles from './LeaderBoardPage.module.css'; 

export default function LeaderBoardPage(): JSX.Element {
  const allLeaders = useAppSelector((store) => store.songs.allLeaders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllLeadersThunk());
  }, [dispatch]);

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <Container className={styles.tableContainer}>
        <Table className={styles.table} stickyHeader stickyHeaderOffset={60}>
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
                <Table.Td>{index + 1}</Table.Td> {/* Индекс + 1 для правильного номера */}
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