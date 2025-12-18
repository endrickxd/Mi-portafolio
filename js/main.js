const bootText = [
    "INITIALIZING SYSTEM...",
    "LOADING KERNEL... [OK]",
    "MOUNTING VOLUMES... [OK]",
    "CHECKING DRIVERS... [OK]",
    "CONNECTING TO HOST: DEV_EXM...",
    "ACCESS GRANTED.",
    "STARTING UI..."
];
const bootScreen = document.getElementById('boot-screen');
const bootLog = document.getElementById('boot-log');
let lineIndex = 0;

function typeLine() {
    if (lineIndex < bootText.length) {
        bootLog.innerHTML += bootText[lineIndex] + "<br>";
        lineIndex++;
        let randomSpeed = Math.floor(Math.random() * 200) + 50;
        setTimeout(typeLine, randomSpeed);
    } else {
        setTimeout(() => {
            gsap.to(bootScreen, { 
                y: "-100%", 
                duration: 0.8, 
                ease: "power4.inOut",
                onComplete: () => {
                    bootScreen.style.display = "none";
                    document.body.style.overflow = "auto";
                }
            });
        }, 800);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.overflow = "hidden";
    typeLine();

    gsap.registerPlugin(ScrollTrigger);

    console.log("%c SYSTEM READY \n DEV_EXM V1.0 \n INITIATED BY ENDRICK XAVIER", "background: #000; color: #fff; font-size: 20px; padding: 10px; border: 1px solid #fff;");
    console.log("%c looking for bugs? hire me instead.", "color: #aaa; font-family: monospace; font-size: 12px;");

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: true });
        const clockEl = document.getElementById('clock');
        if(clockEl) clockEl.innerText = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
    
    const hoverElements = document.querySelectorAll("a, button, .cmd-item, .project-item");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 3, background: "#fff", mixBlendMode: "difference" }));
        el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, background: "transparent", mixBlendMode: "difference" }));
    });

    const tl = gsap.timeline({ delay: 3.5 });
    
    tl.from(".line", { y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out" })
      .from(".hero-info span", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.5");

    gsap.utils.toArray(".heading").forEach(head => {
        gsap.from(head, {
            scrollTrigger: { trigger: head, start: "top 85%" },
            x: -50, autoAlpha: 0, duration: 0.8
        });
    });

    gsap.from(".about-layout", {
        scrollTrigger: { trigger: "#about", start: "top 75%" },
        y: 50, autoAlpha: 0, duration: 1
    });

    gsap.from(".cmd-window", {
        scrollTrigger: { trigger: "#skills", start: "top 80%" },
        scaleY: 0, autoAlpha: 0, duration: 0.5, transformOrigin: "center top"
    });

    gsap.from(".cmd-item", {
        scrollTrigger: { trigger: ".cmd-grid", start: "top 85%" },
        opacity: 0, x: -10, duration: 0.1, stagger: 0.05
    });

    gsap.utils.toArray(".project-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 90%" },
            y: 50, autoAlpha: 0, duration: 0.6, ease: "power2.out"
        });
    });
    const arcadeBtn = document.getElementById("arcade-btn");
    const modal = document.querySelector(".modal-game");
    const closeGame = document.querySelector(".close-game");
    if(arcadeBtn) {
        arcadeBtn.addEventListener("click", () => {
            modal.style.display = "flex";
            gsap.from(".game-box", { scale: 0, duration: 0.5 });
        });
        closeGame.addEventListener("click", () => modal.style.display = "none");
        window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
    }
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const color = btn.getAttribute('data-color');
            document.documentElement.style.setProperty('--fg', color);
            gsap.from("body", { backgroundColor: color, duration: 0.1, ease: "power2.out" });
        });
    });
    const konamiCode = [
        "ArrowUp", "ArrowUp", 
        "ArrowDown", "ArrowDown", 
        "ArrowLeft", "ArrowRight", 
        "ArrowLeft", "ArrowRight", 
        "b", "a"
    ];
    let konamiIndex = 0;
    let isHacked = false;
    document.addEventListener("keydown", (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                toggleOverrideMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    function toggleOverrideMode() {
        isHacked = !isHacked;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (isHacked) {
            osc.type = "sawtooth";
            osc.frequency.value = 100; 
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
            osc.stop(ctx.currentTime + 0.5);
            document.documentElement.style.setProperty('--fg', '#ff003c');
            document.documentElement.style.setProperty('--bg', '#050000');
            const outline = document.querySelector(".hero-title .outline");
            const status = document.querySelector(".hero-info span:last-child");
            if(outline) outline.innerText = "HACKED";
            if(status) status.innerText = "STATUS: COMPROMISED";
            gsap.fromTo("body", 
                { x: -5 },
                { 
                    x: 5, 
                    duration: 0.05, 
                    repeat: 10, 
                    yoyo: true, 
                    ease: "power1.inOut",
                    clearProps: "transform"
                }
            );
            console.clear();
            console.log("%c SYSTEM OVERRIDE ACTIVATED ", "background: #ff003c; color: #000; font-size: 20px; font-weight: bold;");
        } else {
            osc.type = "sine";
            osc.frequency.value = 600; 
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
            osc.stop(ctx.currentTime + 0.3);
            document.documentElement.style.setProperty('--fg', '#00ff00');
            document.documentElement.style.setProperty('--bg', '#000000');
            const outline = document.querySelector(".hero-title .outline");
            const status = document.querySelector(".hero-info span:last-child");
            if(outline) outline.innerText = "DE SISTEMAS";
            if(status) status.innerText = "STATUS: ONLINE";
            console.log("%c SYSTEM RESTORED ", "background: #00ff00; color: #000; font-size: 20px; font-weight: bold;");
        }
    }
    
});