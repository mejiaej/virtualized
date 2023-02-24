import { throttle } from "lodash";
import { cloneElement, useEffect, useRef, useState } from "react";

interface WindowProps {
  rowHeight: number;
  children: Array<JSX.Element>;
}

const bufferedItems = 2;
const Window: React.FC<WindowProps> = ({ rowHeight, children }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
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
    setContainerHeight(containerRef?.current?.clientHeight || 0);
  }, []);

  const renderVisibleChildren = () => {
    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex =
      Math.ceil((scrollPosition + containerHeight) / rowHeight) -
      1 +
      bufferedItems;

    return children.slice(startIndex, endIndex + 1).map((child, index) =>
      cloneElement(child, {
        style: {
          position: "absolute",
          top: (startIndex + index) * rowHeight,
          left: 50,
          right: 50,
          height: rowHeight,
        },
      })
    );
  };

  console.log("scrollPosition", scrollPosition);
  console.log("containerHeight", containerHeight);
  const content = renderVisibleChildren();
  console.log("content.length", content.length);
  return (
    <ul
      ref={containerRef}
      onScroll={handleOnScroll}
      style={{ overflowY: "scroll", height: "100%", position: "relative" }}
    >
      {renderVisibleChildren()}
    </ul>
  );
};

export { Window };
