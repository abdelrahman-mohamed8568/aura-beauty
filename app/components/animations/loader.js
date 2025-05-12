import gsap from "gsap";
export const preLoaderIntroAnim = () => {
  const tl = gsap.timeline();

  tl.to("body", {
    duration: 0.1,
    css: { overflowY: "hidden" },
    ease: "power3.inOut",
  })
    .to(".texts-container", {
      duration: 0,
      opacity: 1,
      ease: "Power3.easeOut",
    })
    .from(".texts-container span", {
      duration: 1,
      delay: 0.5,
      y: 70,
      skewY: 10,
      stagger: 0.4,
      ease: "Power3.easeOut",
    })
    .to(".texts-container span", {
      duration: 1,
      y: 70,
      skewY: -10,
      stagger: 0.2,
      ease: "Power3.easeOut",
    })
    .to(
      ".preloader",
      {
        duration: 1,
        opacity: 0,
        pointerEvents: "none",
        ease: "Power3.easeOut",
        onComplete: () => {
          gsap.to("body", {
            duration: 0.1,
            css: { overflowY: "auto" },
            ease: "power3.inOut",
          });
        },
      },
      "-=0.5"
    );
};
export const mainContentAnimations = () => {
  const tl = gsap.timeline();
  tl.from(".landing__top .sub", {
    duration: 1,
    opacity: 0,
    y: 80,
    ease: "expo.easeOut",
  });
  if (window.innerWidth < 763) {
    tl.from(
      ".landing__main2",
      {
        duration: 1,
        delay: 0,
        opacity: 0,
        y: 80,
        ease: "expo.easeOut",
      },
      "+=0.1"
    );
  }
};
