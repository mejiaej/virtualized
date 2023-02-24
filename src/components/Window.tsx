import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";

interface WindowProps {
  rowHeight: number;
  children: Array<JSX.Element>;
}

const Window: React.FC<WindowProps> = ({ rowHeight, children }) => {
  const [scrollPosition, setScrollPosition] = useState<number>();
  const [containerHeight, setContainerHeight] = useState<number>();
  const containerRef = useRef<HTMLUListElement>(null);

  const throttledOnSroll = throttle(
    (e) => {
      setScrollPosition(e.target.scrollTop);
    },
    50,
    { leading: false }
  );

  const handleOnScroll = (e: any) => {
    throttledOnSroll(e);
  };

  useEffect(() => {
    setContainerHeight(containerRef?.current?.clientHeight);
  }, []);

  console.log("scrollPosition", scrollPosition);
  console.log("containerHeight", containerHeight);
  return (
    <ul
      ref={containerRef}
      onScroll={handleOnScroll}
      style={{ overflowY: "scroll", height: "100%" }}
    >
      {children}
    </ul>
  );
};

export { Window };
