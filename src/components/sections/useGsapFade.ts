import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function useGsapFade(ref: React.RefObject<HTMLElement>, trigger: any) {
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.7, ease: "power2.inOut" }
    );
    return () => {
      if (ref.current) {
        gsap.set(ref.current, { autoAlpha: 0 });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
}
