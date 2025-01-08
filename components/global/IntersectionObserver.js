import React, { useState, useEffect } from 'react';
import { useIntersection } from 'react-use';

export const IntersectionContext = React.createContext({ inView: true });

export const IntersectionObserver = ({
  children,
  reset = true
}) => {
  const [inView, setInView] = useState(false);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.3
  });

  useEffect(() => {
    const inViewNow = intersection && intersection.intersectionRatio > 0.3;
    if (inViewNow) {
      return setInView(inViewNow);
    } else if (reset) {
      return setInView(false);
    }
  }, [intersection, reset]);

  return (
    <IntersectionContext.Provider value={{ inView }}>
      <div ref={intersectionRef}>{children}</div>
    </IntersectionContext.Provider>
  );
};