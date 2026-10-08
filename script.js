/* ==========================================
   AMREEN & ANIL - WEDDING INVITATION JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const waxSeal = document.getElementById("waxSeal");
    const envelopeScene = document.getElementById("envelopeScene");
    const invitation = document.getElementById("invitation");

    if (waxSeal) {
        waxSeal.addEventListener("click", () => {
            waxSeal.disabled = true;
            envelopeScene.classList.add("open");

            // Play Music
            const music = document.getElementById("weddingMusic");
            const musicButton = document.getElementById("musicButton");
            if (music) {
                music.play().then(() => {
                    if (musicButton) musicButton.classList.add("playing");
                }).catch(() => {
                    console.log("Music awaiting interaction");
                });
            }

            // Reveal main content smoothly after 3 seconds
            setTimeout(() => {
                if (invitation) {
                    invitation.classList.add("show");
                }
            }, 3000);

            // Scroll to the cover/counter page after 4.5 seconds (gives ample time to read the poem)
            setTimeout(() => {
                const cover = document.querySelector(".cover-photo");
                if (cover) {
                    cover.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 4500);
        });
    }

    /* MUSIC PLAYER */
    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");

    if (musicButton && music) {
        musicButton.addEventListener("click", () => {
            if (music.paused) {
                music.play().then(() => {
                    musicButton.classList.add("playing");
                });
            } else {
                music.pause();
                musicButton.classList.remove("playing");
            }
        });
    }

    /* COUNTDOWN TIMER */
    const weddingDate = new Date("January 31 2027 18:30:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl) dEl.textContent = String(days).padStart(2, "0");
        if (hEl) hEl.textContent = String(hours).padStart(2, "0");
        if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
        if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ADD TO CALENDAR */
    const calendarButton = document.getElementById("calendarButton");
    if (calendarButton) {
        calendarButton.addEventListener("click", () => {
            const calendar = 
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Wedding Reception - Amreen & Anil
DESCRIPTION:Celebrating Amreen & Anil #AA♾️♥️
LOCATION:Goldfinch Retreat, Bengaluru
DTSTART:20270131T183000
DTEND:20270131T223000
END:VEVENT
END:VCALENDAR`;

            const file = new Blob([calendar], { type: "text/calendar" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "Amreen-Anil-Wedding.ics";
            link.click();
        });
    }

    /* SCROLL REVEAL ANIMATIONS */
    const revealItems = document.querySelectorAll(".venue-section, .rsvp-section, .closing");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";
        item.style.transition = "1s ease";
        observer.observe(item);
    });
});