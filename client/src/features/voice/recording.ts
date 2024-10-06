let mediaRecorder ;
let audioChunks = [];

// Получаем доступ к микрофону
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    // Создаём MediaRecorder для записи аудио
    mediaRecorder = new MediaRecorder(stream);

    // Событие при получении данных
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    // Событие завершения записи
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      audioChunks = [];

      // Создаем ссылку для скачивания файла
      const audioUrl = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'recording.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  })
  .catch((error) => {
    console.error('Ошибка доступа к микрофону: ', error);
  });

// Функции для управления записью
function startRecording() {
  audioChunks = [];
  mediaRecorder.start();
  console.log('Начата запись...');
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Запись остановлена.');
}
