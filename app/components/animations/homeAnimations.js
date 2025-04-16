export const homeAnimations = {
  text: {
    initial: { y: "100%" },
    whileInView: { y: "0%" },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, delay: 0.5 },
  },
  image: (direction = "left") => ({
    initial: {
      x: direction === "left" ? "-200px" : "200px",
      opacity: 0,
      scale: 0.95,
      rotate: direction === "left" ? -10 : 10,
    },
    whileInView: {
      x: "0",
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    viewport: {
      once: true,
      margin: "0px 0px -15% 0px",
      amount: 0.1,
    },
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};
