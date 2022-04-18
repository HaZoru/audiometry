const setupSlide = document.getElementById("setupSlide");
const tonePlayer = document.getElementById("tonePlayer");
const lowerVolConfirmBtn = document.getElementById("lowerVolConfirmBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const setBtn = document.getElementById("setBtn");
const playIndicator = document.getElementById("playIndicator");
const dialogueBox = document.getElementById("dialogueBox");
const loader = document.getElementById("loader");

let setupTone;
lowerVolConfirmBtn.addEventListener("click", () => {
  /**
   * click event handler; resume audioCtx if not running
   */
  function setUp() {
    setupTone = new PureTone(3500, -60);
    dialogueBox.textContent =
      "Press Play and start increasing the volumn. Stop increasing when you hear a sound";
    lowerVolConfirmBtn.classList.add("d-none");
    playPauseBtn.classList.remove("d-none");
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
    setUp();
  } else {
    setUp();
  }
});

let isPlaying = false;
let firstToggle = true;
playPauseBtn.addEventListener("click", () => {
  /**
   * click event handler for play and pause of setup audio
   */
  setBtn.classList.remove("d-none");
  if (!isPlaying && firstToggle) {
    setupTone.play();
    isPlaying = true;
    firstToggle = false;
    playPauseBtn.textContent = "Pause";
  } else if (!isPlaying) {
    //play sample
    setupTone.reconnect();
    isPlaying = true;
    playPauseBtn.textContent = "Pause";
  } else {
    // pause sample
    setupTone.disconnect();
    isPlaying = false;
    playPauseBtn.textContent = "Play";
  }
});

let startTest = false;
setBtn.addEventListener("click", () => {
  /**
   * click event handler; start test if there is a click on last dialogue slide
   */
  setupTone.stop();
  isPlaying = false;
  playPauseBtn.textContent = "Play";
  playPauseBtn.classList.add("d-none");
  dialogueBox.textContent =
    "Do not change your volumn untill the test is over!";
  setBtn.textContent = "START";

  if (startTest) {
    setupSlide.classList.add("d-none");
    tonePlayer.classList.remove("d-none");
    // call some function here to set up other pure tone players and layout
    playTone(initdBfs);
  }
  startTest = true;
});

//main test section

const yesBtn = document.getElementById("yesBtn");
const nobtn = document.getElementById("noBtn");
const playerIndicator = document.getElementById("playerIndicator");

const testFrequencies = [
  40,
  60,
  100,
  200,
  400,
  500,
  600,
  1000,
  2000,
  3500,
  4000,
  5000,
  6000,
  8000,
  9000,
  10000,
  11000,
  12000,
  15000,
];
const initdBfs = -24;
let nowPlaying = 0;
let toneRepeat = 0;
let dbfsVals = [];
let Tone;

function playTone(dbfs) {
  /**
   * creates a tone object from PureTone class and initiate play
   */

  Tone = new PureTone(testFrequencies[nowPlaying], dbfs);
  Tone.play().pulse();
  playerIndicator.textContent = `Playing Audio ${nowPlaying + 1} of ${
    testFrequencies.length
  }`;

  if (expertMode) {
    // expert mode vars defined in layout.js
    dbfsLog.textContent = `dbfs: ${dbfs}`;
    hzLog.textContent = `hz: ${testFrequencies[nowPlaying]}`;
  }
}

yesBtn.addEventListener("click", () => {
  /**
     * click event handler for 'yes' (can hear sound) button
     * discard current playing tone oscillator and create a new one 
       with same frequency but decreased dbfs
     */

  Tone.clearPulse().stop().disconnect();
  console.log(initdBfs - 3 * toneRepeat);
  toneRepeat += 1;
  playTone(initdBfs - 3 * toneRepeat);
});

nobtn.addEventListener("click", () => {
  /**
     * click event handler for 'no' (can't hear sound) button
     * discard current playing tone oscillator and create a new one 
       with the next frequency in testFrequncies array.
     * checks for last test frequency.
       fire an ajax call to backend with recorded infomation.
       on ajax success redirect user to fill in additional info.
     */

  Tone.stop().disconnect();
  dbfsVals.push(initdBfs - 3 * toneRepeat);

  if (nowPlaying === testFrequencies.length - 1) {
    tonePlayer.classList.add("d-none");
    loader.classList.remove("d-none");
    expertModeLogs.classList.add("d-none");
    let data = { dbfs: dbfsVals, hz: testFrequencies };
    $.ajax({
      type: "POST",
      url: "/submit",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      success: function (resp) {
        id_ = resp["id"];
        console.log(resp);
        window.location.href = window.location.origin + "/additional?id=" + id_;
      },
      error: function (err) {
        console.log(err);
      },
    });
  } else {
    nowPlaying += 1;
    toneRepeat = 0;
    playTone(initdBfs);
  }
});
