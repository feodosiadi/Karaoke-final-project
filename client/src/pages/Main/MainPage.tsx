import { Button } from '@mantine/core';
import React from 'react';
import { useAppDispatch } from '../../shared/lib/hooks';
import { logoutThunk } from '../../enteties/User/model/authThunk';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div>
      JFJFJFJJF
      <Button onClick={() => void dispatch(logoutThunk())}>Logout</Button>
    </div>
  );
}
