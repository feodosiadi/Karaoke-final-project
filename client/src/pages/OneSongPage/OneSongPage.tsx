/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Container } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getOneSongThunk } from '../../enteties/Song/model/songThunk';
import postOneRecordThunk from '../../enteties/Record/model/recordThunk';
import styles from './OneSongPage.module.css';
import NavBar from '../../widgets/NavBar/NavBar';
import { clearRecord } from '../../enteties/Record/model/recordSlice';
import ErrorPage from '../Error/ErrorPage';

export default function OneSongPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const navigate = useNavigate();
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(-1);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timer, setTimer] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const score = useAppSelector((store) => store.record.record?.score);
  const oneSong = useAppSelector((store) => store.songs.oneSong);
  const error = useAppSelector((store) => store.songs.error);

  console.log(isRecording, audioURL);

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setAudioURL(URL.createObjectURL(audioBlob));

        const formData = new FormData();
        formData.append('record', audioBlob, 'recording.wav');

        console.log('Отправка новой записи:', audioBlob);
        void dispatch(postOneRecordThunk({ id: Number(params.songId), data: formData }));
      };
    } catch (err) {
      console.error('Ошибка доступа к микрофону:', err);
    }
  };

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
    console.log('Текст субтитров:', srtText);
    return srtText
      .split('\n\n')
      .map((block) => {
        const lines = block.split('\n');
        if (lines.length < 2) return null;

        const times = lines[1]?.split(' --> ');
        if (!times || times.length < 2) return null;

        const startTime = parseTime(times[0]);
        const endTime = parseTime(times[1]);
        const text = lines.slice(2).join('\n');
        return { startTime, endTime, text };
      })
      .filter(Boolean) as Subtitle[];
  }, []);
  const handlePlay = async (): Promise<void> => {
    setTimer(3);

    const countdown = setInterval(async () => {
      setTimer((prevTimer) => {
        if (prevTimer !== null && prevTimer > 0) {
          return prevTimer - 1;
        }
        clearInterval(countdown);
        setTimer(null);

        if (audioRef.current) {
          audioRef.current
            .play()
            .then(async () => {
              setIsPlaying(true);
              setIsFinished(false);

              await startRecording();
              dispatch(clearRecord());
            })
            .catch((playError) => {
              console.error('Ошибка при воспроизведении аудио:', playError);
            });
        }
        return null;
      });
    }, 1000);
  };

  const handleRestart = async (): Promise<void> => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setIsFinished(false);
      await startRecording();
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

        const activeSubtitle = subtitles[activeSubtitleIndex];
        const words = activeSubtitle.text.split(' ');
        const timePerWord = (activeSubtitle.endTime - activeSubtitle.startTime) / words.length;
        const wordIndex = Math.floor((currentTime - activeSubtitle.startTime) / timePerWord);

        setHighlightedWordIndex(wordIndex);
      } else {
        setCurrentSubtitleIndex(-1);
      }
    }
  };

  const handleEnded = (): void => {
    stopRecording();
    setIsPlaying(false);
    setIsFinished(true);
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
        {!isPlaying && !timer && !isFinished && (
          <button onClick={() => void handlePlay()} type="button" className={styles.button}>
            Начать запись
          </button>
        )}

        {isPlaying && !isFinished && (
          <button onClick={() => void handleRestart()} type="button" className={styles.buttonReset}>
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
          <div className={styles.finishedMessage}>Да Вы просто звезда! <br /> Ваши баллы: {score} </div>
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
