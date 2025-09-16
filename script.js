const hoursSelect = document.getElementById('hours');
const minutesSelect = document.getElementById('minutes');
const secondsSelect = document.getElementById('seconds');

const displayHours = document.getElementById('display-hours');
const displayMinutes = document.getElementById('display-minutes');
const displaySeconds = document.getElementById('display-seconds');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

const progressFill = document.getElementById('progress-fill');
const alarm = document.getElementById('alarm-sound');

let totalSeconds = 0;
let remainingSeconds = 0;
let timerInterval = null;

// Populate dropdowns
for(let i=0;i<=23;i++){
  let option = document.createElement('option');
  option.value = i;
  option.text = i.toString().padStart(2,'0');
  hoursSelect.add(option);
}

for(let i=0;i<=59;i++){
  let optionM = document.createElement('option');
  optionM.value = i;
  optionM.text = i.toString().padStart(2,'0');
  minutesSelect.add(optionM);

  let optionS = document.createElement('option');
  optionS.value = i;
  optionS.text = i.toString().padStart(2,'0');
  secondsSelect.add(optionS);
}

// Update display
function updateDisplay() {
  let h = Math.floor(remainingSeconds / 3600);
  let m = Math.floor((remainingSeconds % 3600) / 60);
  let s = remainingSeconds % 60;

  displayHours.textContent = h.toString().padStart(2,'0');
  displayMinutes.textContent = m.toString().padStart(2,'0');
  displaySeconds.textContent = s.toString().padStart(2,'0');

  [displayHours, displayMinutes, displaySeconds].forEach(span=>{
    span.classList.add('animate');
    setTimeout(()=>{span.classList.remove('animate');},300);
  });

  if(totalSeconds>0){
    let percent = ((totalSeconds - remainingSeconds)/totalSeconds)*100;
    progressFill.style.width = percent + '%';
  }
}

function startTimer() {
    if(timerInterval) return;
  
    if(remainingSeconds===0){
      let h = parseInt(hoursSelect.value) || 0;
      let m = parseInt(minutesSelect.value) || 0;
      let s = parseInt(secondsSelect.value) || 0;
      totalSeconds = h*3600 + m*60 + s;
      remainingSeconds = totalSeconds;
      if(totalSeconds===0) return;
    }
  
    timerInterval = setInterval(()=>{
      remainingSeconds--;
      updateDisplay();
      if(remainingSeconds<=0){
        clearInterval(timerInterval);
        timerInterval = null;
        
        // Play looping alarm
        alarm.loop = true;   // Make it loop
        alarm.play().catch(()=>{});  
  
        cuteConfetti(); // Optional confetti effect
      }
    },1000);
  }
  
  // Stop sound when Reset or Pause
  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    alarm.pause();
    alarm.currentTime = 0; // reset to start
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingSeconds = totalSeconds;
    updateDisplay();
    alarm.pause();
    alarm.currentTime = 0; // reset to start
  }
  
// Event listeners
startBtn.addEventListener('click', () => {
    alarm.play().catch(()=>{}); // Unlock audio on first click
    startTimer();
  });
  
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize
updateDisplay();

// Cute confetti effect
function cuteConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti';
  document.body.appendChild(confettiContainer);
  for(let i=0;i<50;i++){
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.background = `hsl(${Math.random()*360},70%,85%)`;
    c.style.left = Math.random()*100 + 'vw';
    c.style.animationDuration = 1+Math.random()*2+'s';
    confettiContainer.appendChild(c);
  }
  setTimeout(()=> confettiContainer.remove(),2500);
}
