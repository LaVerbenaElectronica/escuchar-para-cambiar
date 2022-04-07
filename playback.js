const sources = [
  "http://uk5.internet-radio.com:8260/listen.pls&t=.m3u", // paradise
  "http://uk5.internet-radio.com:8260/listen.pls&t=.m3u", // party gong
  "http://uk5.internet-radio.com:8260/listen.pls&t=.m3u", // folk forward
  "http://uk5.internet-radio.com:8260/listen.pls&t=.m3u" // punk fm
];

const labels = [
  [ "Radio Paradise", "https://www.radioparadise.com" ],
  [ "Party Gong", "https://www.radiogong.de/"],
  [ "SomaFM Folk Forward", "http://somafm.com/folkfwd/"],
  [ "Punk FM", " http://www.punkfm.co.uk/"]
];

let playingIndex = 0; // current radio
let playing = false; // stream status
let music = null;

setTimeout(function(){
    loadStream(playingIndex);
}, 1);

function loadStream(index){
  if(playing && music !== null)
    destroyStream();

  music = new Audio();
  music.src = sources[index];
  music.load();
  music.play();
  setLabel(index);
  pauseIcon();
  playingIndex = index;
  playing = true;
}

function destroyStream(){
  music.pause();
  music.src = "";
  playIcon();
  playing = false;
}

function changePlayback(){
  if(playing){ destroyStream();  }else{  loadStream(playingIndex);  }
}

function setLabel(index){
  document.getElementById("label").innerHTML = '<h6> <a target="_blank" href="' + labels[index][1] + '">' + labels[index][0] + '</a></h6>';
}

document.onkeydown = function(e) {
  e = e || window.event;
  switch(e.which || e.keyCode) {
    case 32:
      changePlayback();
    break;
  }
};

// icons
function pauseIcon(){
  document.getElementById('playbackButton').className = 'icon fa-pause';
}
function playIcon(){
  document.getElementById('playbackButton').className = 'icon fa-play';
}
