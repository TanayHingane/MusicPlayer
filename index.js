const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");
// queue = document.getElementById("queue");

const music = new Audio();

const songs = [
  {
    path: "assets/1.m4a",
    displayName: "Aankhon Mein Doob Jaane Ko",
    cover: "assets/1.jpg",
    artist: "THE 9TEEN",
  },
  {
    path: "assets/2.m4a",
    displayName: "Badtameez Dil",
    cover: "assets/2.jpg",
    artist: "Pritam",
  },
  {
    path: "assets/3.m4a",
    displayName: "Chammak Challo",
    cover: "assets/3.jpg",
    artist: "Akon",
  },
  {
    path: "assets/4.m4a",
    displayName: "Chand Tu Nabhatla",
    cover: "assets/4.jpg",
    artist: "Swapnil Bandodkar",
  },
  {
    path: "assets/5.m4a",
    displayName: "Ishq Hai",
    cover: "assets/5.jpg",
    artist: "Akon",
  },
  {
    path: "assets/6.m4a",
    displayName: "Kase Sartil Saye",
    cover: "assets/6.jpg",
    artist: "Sandeep Khare",
  },
  {
    path: "assets/7.m4a",
    displayName: "Love is Waste of Time",
    cover: "assets/7.jpg",
    artist: "Akon",
  },
  {
    path: "assets/8.m4a",
    displayName: "O Rangrez",
    cover: "assets/8.jpg",
    artist: "Akon",
  },
  {
    path: "assets/9.m4a",
    displayName: "One Love",
    cover: "assets/9.jpg",
    artist: "Akon",
  },
  {
    path: "assets/10.m4a",
    displayName: "Saudebaazi",
    cover: "assets/10.jpg",
    artist: "Akon",
  },
  {
    path: "assets/11.m4a",
    displayName: "Sheila ki Javani",
    cover: "assets/11.jpg",
    artist: "Akon",
  },
  {
    path: "assets/12.m4a",
    displayName: "Tumse Milke",
    cover: "assets/12.jpg",
    artist: "Akon",
  },
  {
    path: "assets/13.m4a",
    displayName: "Until I Found Her",
    cover: "assets/13.jpg",
    artist: "Akon",
  },
  {
    path: "assets/14.m4a",
    displayName: "Ved Lavlay",
    cover: "assets/14.jpg",
    artist: "Akon",
  },
  {
    path: "assets/15.m4a",
    displayName: "Zaroor",
    cover: "assets/15.jpg",
    artist: "Akon",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  // Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  // Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function getShuffledNumbers() {
  let numbers = Array.from({ length: 15 }, (_, i) => i + 1);

  for (let i = numbers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  const randomNumber3 = getShuffledNumbers()[musicIndex];
  loadMusic(songs[randomNumber3]);
  playMusic();
}

// function onhover() {
//   musicIndex = (musicIndex + direction + songs.length) % songs.length;
//   queue.textContent = songs[musicIndex].displayName;
//   return songs[musicIndex];
// }

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => {
  changeMusic(1);
});
// queue.addEventListener("click", onhover);
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
