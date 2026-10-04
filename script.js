/* ==========================================
   AMREEN & ANIL
   LUXURY WEDDING INVITATION
   JAVASCRIPT
========================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{

/* ==========================================
   LOADING SCREEN
========================================== */


const loader =
document.getElementById("loader");



window.addEventListener(
"load",
()=>{


setTimeout(()=>{


loader.classList.add(
"hide"
);



},1500);



});



/* ==========================================
   ENVELOPE OPENING
========================================== */


const waxSeal =
document.getElementById(
"waxSeal"
);



const envelopeScene =
document.getElementById(
"envelopeScene"
);



const invitation =
document.getElementById(
"invitation"
);




waxSeal.addEventListener(
"click",
()=>{



// prevent multiple clicks

waxSeal.disabled=true;




// open envelope

envelopeScene.classList.add(
"open"
);

/*
 Sequence:

 0 sec
 seal disappears

 1.6 sec
 card rises

 3.5 sec
 invitation unfolds

*/



setTimeout(() => {

    const cover = document.querySelector(".cover-photo");

    if (cover) {
        cover.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

}, 2500);

});

setTimeout(
    ()=>{

        invitation.classList.add("show");

    },
    5000
);

/* ==========================================
   MUSIC PLAYER
========================================== */


const music =
document.getElementById(
"weddingMusic"
);



const musicButton =
document.getElementById(
"musicButton"
);



let playing=false;

function playMusic() {
    music.play().then(() => {
        playing = true;
        musicButton.classList.add("playing");
    }).catch(() => {
        playing = false;
        musicButton.classList.remove("playing");
    });
}

// Attempt autoplay on load
playMusic();

// Fallback: Start playing on first click anywhere if browser blocked initial autoplay
document.addEventListener("click", () => {
    if (!playing) {
        playMusic();
    }
}, { once: true });

musicButton.addEventListener(
"click",
(e)=>{

e.stopPropagation();

if(!playing){
    playMusic();
}
else {
    music.pause();
    playing=false;
    musicButton.classList.remove("playing");
}

});




/* ==========================================
   COUNTDOWN
========================================== */


const weddingDate =
new Date(
"January 31 2027 18:30:00"
)
.getTime();





function updateCountdown(){



const now =
new Date()
.getTime();



const distance =
weddingDate-now;




if(distance<=0){

return;

}





const days =
Math.floor(
distance /
(1000*60*60*24)
);



const hours =
Math.floor(
(distance %
(1000*60*60*24))
/
(1000*60*60)
);



const minutes =
Math.floor(
(distance %
(1000*60*60))
/
(1000*60)
);



const seconds =
Math.floor(
(distance %
(1000*60))
/1000
);






document.getElementById(
"days"
).textContent =
String(days)
.padStart(2,"0");



document.getElementById(
"hours"
).textContent =
String(hours)
.padStart(2,"0");



document.getElementById(
"minutes"
).textContent =
String(minutes)
.padStart(2,"0");



document.getElementById(
"seconds"
).textContent =
String(seconds)
.padStart(2,"0");



}





updateCountdown();


setInterval(
updateCountdown,
1000
);









/* ==========================================
   ADD TO CALENDAR
========================================== */


const calendarButton =
document.getElementById(
"calendarButton"
);




if(calendarButton){



calendarButton.addEventListener(
"click",
()=>{



const calendar =

`
BEGIN:VCALENDAR

VERSION:2.0

BEGIN:VEVENT

SUMMARY:
Wedding Reception - Amreen & Anil

DESCRIPTION:
Celebrating Amreen & Anil #AA♾️♥️

LOCATION:
Goldfinch Retreat, Bengaluru

DTSTART:
20270131T183000

DTEND:
20270131T223000

END:VEVENT

END:VCALENDAR
`;




const file =
new Blob(
[
calendar
],
{
type:
"text/calendar"
}
);




const link =
document.createElement(
"a"
);



link.href =
URL.createObjectURL(
file
);



link.download =
"Amreen-Anil-Wedding.ics";



link.click();



});



}



/* ==========================================
   GALLERY TOUCH CONTROL
========================================== */


const gallery =
document.querySelector(
".gallery-track"
);



if(gallery){



let startX=0;



gallery.addEventListener(
"touchstart",
(e)=>{


startX =
e.touches[0].clientX;


});





gallery.addEventListener(
"touchmove",
(e)=>{


let move =
e.touches[0].clientX;



gallery.scrollLeft +=
startX-move;



startX=move;



});



}









/* ==========================================
   SCROLL REVEAL
========================================== */


const reveal =
document.querySelectorAll(
".venue-section, .gallery-section, .rsvp-section, .closing"
);




const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";


entry.target.style.transform=
"translateY(0)";



}



});


},
{
threshold:.15
}
);




reveal.forEach(
(item)=>{


item.style.opacity="0";


item.style.transform=
"translateY(40px)";


item.style.transition=
"1s ease";



observer.observe(
item
);


});

});