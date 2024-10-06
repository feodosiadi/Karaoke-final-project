import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getOneSongThunk } from '../../enteties/Song/model/songThunk';
import { postOneRecordThunk } from '../../enteties/Record/model/recordThunk';
import NavBar from '../../widgets/NavBar/NavBar';

export default function OneSongPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Начало записи
  // 
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
  
      mediaRecorder.start();
      setIsRecording(true);
      audioChunks.current = []; // Очистим старые данные перед началом новой записи
  
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
  
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setAudioURL(URL.createObjectURL(audioBlob));
  
        const formData = new FormData();
        formData.append('record', audioBlob, 'recording.wav'); // Добавляем Blob и указываем имя файла
  
        // Отправляем данные через thunk
        console.log('Отправка новой записи:', audioBlob);
        void dispatch(postOneRecordThunk({ id: params.songId, data: formData }));
      };
    } catch (err) {
      console.error('Ошибка доступа к микрофону:', err);
    }
  };

  // Остановка записи
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (params.songId) {
      void dispatch(getOneSongThunk(Number(params.songId)));
    }
  }, [dispatch, params.songId]);

  return (
    <Container>
      <NavBar />
      <h2>Запись голоса</h2>
      <Button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Остановить запись' : 'Начать запись'}
      </Button>
      {audioURL && (
        <div>
          <h3>Записанный файл:</h3>
          <audio controls src={audioURL} />
          <a href={audioURL} download="recording.wav">
            Скачать запись
          </a>
        </div>
      )}
    </Container>
  );
}
