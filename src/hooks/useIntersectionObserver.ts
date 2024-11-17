import { useEffect, useRef } from "react";

interface IIntersectionObserverProps {
  rootMargin?: string;
  threshold?: number;
  callback?: () => void;
  disconnectOnIntersect?: boolean;
  forceStop?: boolean;
}

export default function useIntersectionObserver({
  rootMargin,
  threshold,
  disconnectOnIntersect,
  callback,
  forceStop,
}: IIntersectionObserverProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || forceStop) {
      return;
    }

    const refCurrent = observerRef.current;

    const observerParams: IntersectionObserverInit = {};

    if (typeof rootMargin === "string") {
      observerParams.rootMargin = rootMargin;
    }

    if (typeof threshold === "number") {
      observerParams.threshold = threshold;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && typeof callback === "function") {
        callback();

        if (disconnectOnIntersect) {
          observer.disconnect();
        }
      }
    }, observerParams);

    observer.observe(refCurrent);

    return () => {
      if (refCurrent) observer.unobserve(refCurrent);
    };
  }, [rootMargin, threshold, disconnectOnIntersect, forceStop, callback]);

  return observerRef;
}
