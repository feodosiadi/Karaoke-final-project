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
  const [isFinished, setIsFinished] = useState(false); // Состояние для завершения аудио
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(-1); // Индекс текущего субтитра
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(-1); // Индекс слова, которое поётся сейчас
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Состояние для отслеживания воспроизведения
  const [timer, setTimer] = useState<number | null>(null); // Для отсчета времени
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const points = useAppSelector((store) => store.record.)
  // Начало записи
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

  type Subtitle = {
    startTime: number;
    endTime: number;
    text: string;
  };

  const parseSRT = (srtText: string): Subtitle[] =>
    srtText.split('\n\n').map((block) => {
      const lines = block.split('\n');
      const times = lines[1].split(' --> ');
      const startTime = parseTime(times[0]);
      const endTime = parseTime(times[1]);
      const text = lines.slice(2).join('\n'); // Оставляем переносы строк
      return { startTime, endTime, text };
    });

  const parseTime = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':');
    const [sec, ms] = seconds.split(',');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(`${sec}.${ms}`);
  };

  const handlePlay = () => {
    // Запускаем таймер обратного отсчета
    setTimer(3); // Таймер отсчета

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer !== null && prevTimer > 0) {
          return prevTimer - 1; // Уменьшаем таймер каждую секунду
        }
        clearInterval(countdown); // Останавливаем таймер, когда он доходит до 0
        setTimer(null); // Сбрасываем таймер

        if (audioRef.current) {
          audioRef.current.play(); // Начинаем проигрывание песни
          setIsPlaying(true); // Отмечаем, что песня началась
          setIsFinished(false); // Сбрасываем завершение
          startRecording(); // Начало записи
        }
        return null;
      });
    }, 1000); // Интервал в 1 секунду
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsFinished(false); // Сбрасываем завершение при перезапуске
      startRecording(); // Перезапускаем запись
    }
  };

  const handleTimeUpdate = () => {
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
  const handleEnded = () => {
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
    // Загрузка субтитров из файла
    fetch('../../../public/song/subtitles/DevochkaPieSubtitles.srt')
      .then((response) => response.text())
      .then((data) => {
        const parsedSubtitles = parseSRT(data);
        setSubtitles(parsedSubtitles);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке субтитров:', error);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>ДЕВОЧКА ПАЙ - Караоке</h1>

      {/* Панель управления */}
      {!isPlaying && !timer && !isFinished && (
        <button
          onClick={() => {
            handlePlay();
          }}
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00', // Светящаяся зелёная кнопка
            boxShadow: '0 0 10px 5px rgba(0, 255, 0, 0.7)',
            transition: 'background-color 0.3s ease',
          }}
        >
          Начать запись
        </button>
      )}

      {isPlaying && !isFinished && (
        <button
          onClick={handleRestart}
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00',
            boxShadow: '0 0 10px 5px rgba(0, 255, 0, 0.7)',
            transition: 'background-color 0.3s ease',
          }}
        >
          Записать заново
        </button>
      )}

      {/* Таймер обратного отсчета */}
      {timer !== null && (
        <div style={{ fontSize: '96px', color: 'white', marginTop: '20px' }}>
          Запись начнется через {timer}...
        </div>
      )}

      {/* Аудиоплеер */}
      <audio
        ref={audioRef}
        src="../../../public/song/minus/Девочка+пай+minus_out.mp3"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded} // Останавливаем запись и завершаем
        style={{ display: 'none' }} // Скрываем стандартные элементы управления
        controls={false} // Убираем возможность перематывать
      />

      {/* Субтитры */}
      <div
        style={{
          color: 'white',
          backgroundColor: 'black',
          padding: '10px',
        }}
      >
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
                style={{
                  color: index === currentSubtitleIndex ? 'white' : 'gray',
                  fontSize: index === currentSubtitleIndex ? '96px' : '48px', // Крупнее для активной строки, меньше для соседних
                  marginBottom: '10px',
                }}
              >
                {lines.map((line, lineIndex) => (
                  <div key={lineIndex} style={{ marginBottom: '5px' }}>
                    {line.split(' ').map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        style={{
                          color:
                            currentSubtitleIndex === index && wordIndex === highlightedWordIndex
                              ? 'yellow'
                              : 'inherit',
                          // Добавляем неоновое свечение для выделенных слов
                          textShadow:
                            currentSubtitleIndex === index && wordIndex === highlightedWordIndex
                              ? '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFA500, 0 0 40px #FFA500'
                              : 'none',
                          fontWeight:
                            currentSubtitleIndex === index && wordIndex === highlightedWordIndex
                              ? 'bold'
                              : 'normal',
                        }}
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

      {/* Сообщение после завершения */}
      {isFinished && (
        <div style={{ fontSize: '64px', color: 'gold', marginTop: '20px' }}>
          Да Вы просто звезда!
        </div>
      )}
    </div>
  );
}