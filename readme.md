# Countdown Timer Project

A responsive countdown timer built with **HTML, CSS, and JavaScript**.  
The timer allows users to select hours, minutes, and seconds, and provides a looping audio alert when the countdown ends.

---

## Features

- Select hours, minutes, and seconds using dropdown menus  
- Start, Pause, and Reset functionality  
- Progress bar displaying elapsed time  
- Audio alert plays repeatedly when countdown reaches zero  
- Responsive design for desktop and mobile  

---

## How to Use

1. Open `index.html` in a browser  
2. Select the desired hours, minutes, and seconds  
3. Click **Start** to begin the countdown  
4. Click **Pause** to pause the timer  
5. Click **Reset** to reset the timer  
6. The audio alert will play in a loop when the countdown reaches zero until paused or reset  

---

## Technical Details

- Countdown implemented using JavaScript `setInterval`  
- Audio handled via the HTMLAudioElement API with looping enabled  
- Dropdowns prevent manual input to ensure valid time values  
- Progress bar updated dynamically using CSS transitions  
- Fully responsive design using CSS media queries  

---

## Demo

<video width="600" controls>
  <source src="demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## License

MIT License
