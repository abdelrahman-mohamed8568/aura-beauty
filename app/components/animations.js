export function slideInOut() {
  // تقليل المدة لجعل الانتقال أسرع قليلاً (1500ms)
  const duration = 2500;
  // منحنى تخفيف يعطي تأثير "ease-in-out" طبيعي
  const easing = "cubic-bezier(0.42, 0, 0.58, 1)";

  // الانتقال للعنصر القديم (الذي يختفي)
  document.documentElement.animate(
    [
      {
        clipPath: "inset(0 0 0 0)",
        transform: "translateY(0) ",
        opacity: 1,
      },
      {
        clipPath: "inset(0 0  100% 0)",
        transform: "translateY(0) ",
        opacity: 0,
      },
    ],
    {
      duration,
      easing,
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  // الانتقال للعنصر الجديد (الذي يظهر)
  document.documentElement.animate(
    [
      // يبدأ من حالة مخفية تمامًا (clipPath يغطي كامل العنصر) مع تحريك بسيط للأسفل وتقلص بسيط
      {
        clipPath: "inset(100% 0 0 0)",
        transform: "translateY(0) ",
        opacity: 0,
      },
      // ينكشف بالكامل ويستقر في مكانه مع الحفاظ على القياس الطبيعي
      { opacity: 1, clipPath: "inset(0 0 0 0)", transform: "translateY(0) " },
    ],
    {
      duration,
      easing,
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}
