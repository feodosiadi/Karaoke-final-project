let mediaRecorder: MediaRecorder;
let audioChunks: Blob[] = [];

navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream: MediaStream) => {
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      audioChunks = [];

      const audioUrl = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'recording.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  })
  .catch((error: Error) => {
    console.error('Ошибка доступа к микрофону: ', error);
  });

function startRecording(): void {
  audioChunks = [];
  mediaRecorder.start();
  console.log('Начата запись...');
}

function stopRecording(): void {
  mediaRecorder.stop();
  console.log('Запись остановлена.');
}
