document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
    
    const hoverElements = document.querySelectorAll("a, button, .cmd-item, .project-item");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 3, background: "#fff", mixBlendMode: "difference" }));
        el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, background: "transparent", mixBlendMode: "difference" }));
    });

    const tl = gsap.timeline();
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
});