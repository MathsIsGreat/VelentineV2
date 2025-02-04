    /*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}
var last_Date = Date.now()
/*--------------------
Animate
--------------------*/
    var b = 0;
    function transPp() {
      if(b<=200) {
        document.querySelectorAll(".btn-3").forEach((item, _)=> item.style.opacity = ""+b/200);
        b+=20;
      }else{
        clearInterval(intervalId1)
      }
    }
    let intervalId1;

    var isShowing = false;
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  if (progress === 100) {
    if (Date.now() - last_Date > 500) {
      setTimeout(function () {
        intervalId1 = setInterval(transPp, 50)
      }, 100);
      last_Date = Date.now();
    }
  }
  $items.forEach((item, index) => displayItems(item, index, active))
}
var no = false;
function onNo(){
    if(no){
        document.getElementById('pop message').innerText = "I knew you were playing hard to get!";
        document.getElementById('closes').innerText = "OfCourse!";
        document.getElementById('popup').style.animation="bro 1s linear normal";
        document.getElementById('popup').style.animationFillMode="forwards";
        return;
    }
    no = true;
    document.getElementById('popup').style.animation="bro 1s linear normal";
    document.getElementById('popup').style.animationFillMode="forwards";
    document.getElementById('jai ho').innerHTML  = '<span class=\'text\'>Maybe?</span><span>🎉</span>'
}
var okk = false;
function onOkay(){
    if(okk) {
        window.location.replace("https://www.geeksforgeeks.org");
    }
    okk = true;
    document.getElementById('popup').style.animation="bro2 0.5s linear normal";
    document.getElementById('popup').style.animationFillMode="forwards";
}
function rgbToHex(r, g, b) {
  return "."+(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}
function setShadow(item, transparency){
  item.style.boxShadow = "0 10px 50px 10px #00"+rgbToHex(0,0,transparency).replace(".", "");
}
progress = 0
active = 0
$items.forEach((item, index) => displayItems(item, index, active))
    let a = 0;

    function transP() {
    if(a<=200) {
      let transparency = a;
      $items.forEach((item, _) => setShadow(item, transparency));
      a+=20;
    }else{
      clearInterval(intervalId)
    }
}
let intervalId = setInterval(transP, 50);



/*--------------------
Click on Items
--------------------*/


/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
  console.log("a raja ji")
}


function togglePlay() {
  const video = document.getElementById('videoPlayer');
  const playButton = document.getElementById('playButton');

  if (video.style.display === 'none') {
      video.style.display = 'block'; // Show video
      playButton.style.display = 'none'; // Hide button
      video.src += "?autoplay=1"; // Autoplay video
  }
}

/*--------------------
Listeners
--------------------*/
let elm = document;
elm.addEventListener('mousewheel', handleWheel)
elm.addEventListener('mousedown', handleMouseDown)
elm.addEventListener('mousemove', handleMouseMove)
elm.addEventListener('mouseup', handleMouseUp)
elm.addEventListener('touchstart', handleMouseDown)
elm.addEventListener('touchmove', handleMouseMove)
elm.addEventListener('touchend', handleMouseUp)
    elm.style.pointerEvents="none";