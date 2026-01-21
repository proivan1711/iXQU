import {useEffect, useState} from "react";

const BREAKPOINTS = {
  SMALL_MOBILE: 30,
  TABLET: 40,
  LAPTOP: 64,
  DESKTOP: 80,
};

export function useBreakPoints(
  breakpointParam: "SMALL_MOBILE" | "TABLET" | "LAPTOP" | "DESKTOP",
) {
  const breakpoint = BREAKPOINTS[breakpointParam];

  const [isOverBreakpoint, setIsOverBreakpoint] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}rem)`);
    const onChange = () => {
      setIsOverBreakpoint(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange);
    setIsOverBreakpoint(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isOverBreakpoint;
}
