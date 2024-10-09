/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Container } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getOneSongThunk } from '../../enteties/Song/model/songThunk';
import { postOneRecordThunk } from '../../enteties/Record/model/recordThunk';
import styles from './OneSongPage.module.css';
import NavBar from '../../widgets/NavBar/NavBar';
import { clearRecord } from '../../enteties/Record/model/recordSlice';
import ErrorPage from '../Error/ErrorPage';

export default function OneSongPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false); // Состояние для завершения аудио
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const navigate = useNavigate();
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(-1); // Индекс текущего субтитра
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(-1); // Индекс слова, которое поётся сейчас
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Состояние для отслеживания воспроизведения
  const [timer, setTimer] = useState<number | null>(null); // Для отсчета времени
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const score = useAppSelector((store) => store.record.record?.score);
  const oneSong = useAppSelector((store) => store.songs.oneSong);
  const error = useAppSelector((store) => store.songs.error);

  console.log(isRecording, audioURL);

  // Начало записи
  const startRecording = async (): Promise<void> => {
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
        void dispatch(postOneRecordThunk({ id: Number(params.songId), data: formData }));
      };
    } catch (err) {
      console.error('Ошибка доступа к микрофону:', err);
    }
  };

  // Остановка записи
  const stopRecording = (): void => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  type Subtitle = {
    startTime: number;
    endTime: number;
    text: string;
  };

  const parseTime = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':');
    const [sec, ms] = seconds.split(',');
    return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseFloat(`${sec}.${ms}`);
  };

  const parseSRT = useCallback((srtText: string): Subtitle[] => {
    console.log('Текст субтитров:', srtText); // Отладочный вывод для проверки
    return srtText
      .split('\n\n')
      .map((block) => {
        const lines = block.split('\n');
        if (lines.length < 2) return null; // Проверка на количество строк в блоке

        const times = lines[1]?.split(' --> ');
        if (!times || times.length < 2) return null; // Если формат неверный, пропускаем блок

        const startTime = parseTime(times[0]);
        const endTime = parseTime(times[1]);
        const text = lines.slice(2).join('\n'); // Оставляем переносы строк
        return { startTime, endTime, text };
      })
      .filter(Boolean) as Subtitle[]; // Фильтруем null значения и приводим тип
  }, []); // Укажите зависимости, если нужно

  const handlePlay = async (): Promise<void> => {
    // Запускаем таймер обратного отсчета
    setTimer(3); // Таймер отсчета

    const countdown = setInterval(async () => {
      setTimer((prevTimer) => {
        if (prevTimer !== null && prevTimer > 0) {
          return prevTimer - 1; // Уменьшаем таймер каждую секунду
        }
        clearInterval(countdown); // Останавливаем таймер, когда он доходит до 0
        setTimer(null); // Сбрасываем таймер

        if (audioRef.current) {
          // Начинаем проигрывание песни
          audioRef.current
            .play()
            .then(async () => {
              // Здесь добавляем async
              setIsPlaying(true); // Отмечаем, что песня началась
              setIsFinished(false); // Сбрасываем завершение

              // Ожидаем завершения записи
              await startRecording(); // Начало записи
              dispatch(clearRecord());
            })
            .catch((playError) => {
              console.error('Ошибка при воспроизведении аудио:', playError);
            });
        }
        return null;
      });
    }, 1000); // Интервал в 1 секунду
  };

  const handleRestart = async (): Promise<void> => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Сбрасываем время аудио
      await audioRef.current.play(); // Ждем, пока аудио начнет воспроизводиться
      setIsFinished(false); // Сбрасываем завершение при перезапуске
      await startRecording(); // Перезапускаем запись, ожидая завершения
      dispatch(clearRecord());
    }
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      const { currentTime } = audioRef.current;
      const activeSubtitleIndex = subtitles.findIndex(
        (subtitle) => currentTime >= subtitle.startTime && currentTime <= subtitle.endTime,
      );

      if (activeSubtitleIndex !== -1) {
        setCurrentSubtitleIndex(activeSubtitleIndex);

        // Рассчитываем индекс текущего слова на основе времени
        const activeSubtitle = subtitles[activeSubtitleIndex];
        const words = activeSubtitle.text.split(' ');
        const timePerWord = (activeSubtitle.endTime - activeSubtitle.startTime) / words.length;
        const wordIndex = Math.floor((currentTime - activeSubtitle.startTime) / timePerWord);

        setHighlightedWordIndex(wordIndex);
      } else {
        setCurrentSubtitleIndex(-1); // Если нет активного субтитра
      }
    }
  };

  // Завершаем запись и помечаем песню как завершённую
  const handleEnded = (): void => {
    stopRecording(); // Останавливаем запись
    setIsPlaying(false); // Останавливаем воспроизведение
    setIsFinished(true); // Помечаем как завершённое
  };

  useEffect(() => {
    if (params.songId) {
      void dispatch(getOneSongThunk(Number(params.songId)));
    }
  }, [dispatch, params.songId]);

  useEffect(() => {
    if (oneSong?.subtitles) {
      console.log('Загрузка субтитров с:', oneSong.subtitles);

      fetch(`/public/${oneSong?.subtitles}` || '', {
        method: 'GET',
        headers: { 'Content-Type': 'text/plain' },
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.text();
        })
        .then((data) => {
          const parsedSubtitles = parseSRT(data);
          setSubtitles(parsedSubtitles);
        })
        .catch((subtitleError) => {
          console.error('Ошибка при загрузке субтитров:', subtitleError);
        });
    }
  }, [oneSong?.subtitles, parseSRT]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <Container>
        <h1>{oneSong?.name} - Караоке</h1>

        {!isPlaying && !timer && !isFinished && (
          <button onClick={() => void handlePlay()} type="button" className={styles.button}>
            Начать запись
          </button>
        )}

        {isPlaying && !isFinished && (
          <button onClick={() => void handleRestart()} type="button" className={styles.button}>
            Записать заново
          </button>
        )}

        {timer !== null && <div className={styles.timer}>Запись начнется через {timer}...</div>}

        <audio
          ref={audioRef}
          src={`/public/${oneSong?.minus}`}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          style={{ display: 'none' }}
          controls={false}
        />

        <div className={styles.subtitlesContainer}>
          {subtitles.map((subtitle, index) => {
            const lines = subtitle.text.split('\n');

            if (
              index === currentSubtitleIndex ||
              index === currentSubtitleIndex - 1 ||
              index === currentSubtitleIndex + 1
            ) {
              return (
                <div
                  key={index}
                  className={
                    index === currentSubtitleIndex ? styles.subtitleActive : styles.subtitle
                  }
                >
                  {lines.map((line, lineIndex) => (
                    <div key={lineIndex}>
                      {line.split(' ').map((word, wordIndex) => (
                        <span
                          key={wordIndex}
                          className={
                            currentSubtitleIndex === index && wordIndex === highlightedWordIndex
                              ? styles.wordHighlighted
                              : ''
                          }
                        >
                          {`${word} `}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>

        {isFinished && score && (
          <div className={styles.finishedMessage}>Да Вы просто звезда! Ваш счёт – {score} </div>
        )}

        {isFinished && !score && (
          <div className={styles.finishedMessage}>Считаю баллы. Обождите</div>
        )}
      </Container>
      <Button onClick={() => navigate(-1)} className={styles.buttonChangeSong}>
        Сменить песню
      </Button>
    </div>
  );
}
