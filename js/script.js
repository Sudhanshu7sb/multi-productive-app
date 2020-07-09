const slider = document.querySelector('.items');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;  // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3.5;
    slider.scrollLeft = scrollLeft - walk;
  }); 

//   sliding function ends



// countdown starts
// var start = document.getElementById('start');
// var reset = document.getElementById('reset');

// var h = document.getElementById("hour");
// var m = document.getElementById("minute");
// var s = document.getElementById("sec");

// //store a reference to the startTimer variable
// var startTimer = null;

// start.addEventListener('click', function(){
//     //initialize the variable
//     function startInterval(){
//         startTimer = setInterval(function() {
//             timer();
//         }, 1000);
//     }
//     startInterval();
// })

// reset.addEventListener('click', function(){
//     h.value = 0;
//     m.value = 0;
//     s.value = 0;
//     //stop the timer after pressing "reset"
//     stopInterval()
// })

// function timer(){
//     if(h.value == 0 && m.value == 0 && s.value == 0){
//         h.value = 0;
//         m.value = 0;
//         s.value = 0;
//     } else if(s.value != 0){
//         s.value--;
//     } else if(m.value != 0 && s.value == 0){
//         s.value = 59;
//         m.value--;
//     } else if(h.value != 0 && m.value == 0){
//         m.value = 60;
//         h.value--;
//     }
//     return;
// }

// //stop the function after pressing the reset button, 
// //so the time wont go down when selecting a new time after pressing reset
// function stopInterval() {
//     clearInterval(startTimer);
// } 



// Pomodoro starts
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then,seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp,seconds) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = seconds ? `Be Back At : ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}` : "";
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  
  console.log(mins);
  timer(mins * 60);
  this.reset();
});

// let reset = document.querySelector(".reset");
// reset.addEventListener("click", () => {
//   endTime.style.display = "none";
// })