import { useState } from "react";
import {
  Image as ChakraImage,
  Box,
  Skeleton,
  type ImageProps as ChakraImageProps,
} from "@chakra-ui/react";
import { useIntersectionObserver } from "hooks";

interface IImageProps extends ChakraImageProps {
  lazy?: boolean;
}

export default function Image({
  borderRadius = "md",
  boxShadow = "md",
  lazy = true,
  ...props
}: IImageProps) {
  const [isVisible, setIsVisible] = useState(!lazy);
  const [loaded, setLoaded] = useState(false);
  const imgContainerRef = useIntersectionObserver({
    callback: () => setIsVisible(true),
    disconnectOnIntersect: true,
    rootMargin: "300px",
    forceStop: !lazy,
  });

  return (
    <Box
      ref={imgContainerRef}
      position="relative"
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      h="100%"
    >
      <Skeleton
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        borderRadius={borderRadius}
        display={loaded ? "none" : "block"}
      />
      {isVisible && (
        <ChakraImage
          onLoad={() => setLoaded(true)}
          display={loaded ? "block" : "none"}
          objectFit="contain"
          width="100%"
          height="100%"
          {...props}
        />
      )}
    </Box>
  );
}
