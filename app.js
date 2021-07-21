const btnTalk = document.querySelector('.talk');
const btnStop = document.querySelector('.stop');
const status = document.querySelector('.status');
const elmAudio = document.getElementById('mehter');
const modalText = document.querySelector('.modal-body');
const infoModal = new bootstrap.Modal(document.getElementById('infoModal'), {
  keyboard: false
});

const PLAY_TRANSCRIPT = 'ver mehteri';
const STOP_TRANSCRIPT = 'bu kadar yeter';

const SpeechRecognation = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognation();

recognition.onstart = function () {
  status.innerText = 'konuşabilirsiniz ...';
}

recognition.onresult = function (event) {
  const eventIndex = event.resultIndex;
  const transcript = event.results[eventIndex][0].transcript;

  if (transcript === PLAY_TRANSCRIPT) {
    elmAudio.play();
    btnStop.disabled = false;
    btnTalk.disabled = true;
  } 

  if (transcript === STOP_TRANSCRIPT) {
    elmAudio.pause();
    elmAudio.currentTime = 0;

    btnStop.disabled = true;
    btnTalk.disabled = false;
  }
  
  infoModal.hide();
  status.innerText = '';
}

recognition.onaudioend = function() {
  status.innerText = '';
}

btnTalk.addEventListener('click', () => {
  modalText.innerHTML = '<mark>"Ver mehteri"</mark> cümlesini sesli olarak söyleyin.';
  recognition.start();  
});

btnStop.addEventListener('click', () => {
  modalText.innerHTML = 'Mehteri durdurmak için <mark>"bu kadar yeter"</mark> cümlesini sesli söyleyin';
  recognition.start();
});
