import { useMemo } from "react";
import {
  Box,
  Center,
  Spinner,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useListPhotos } from "core/hooks/photo";
import Image from "components/Image";
import MasonryGrid from "components/MasonryGrid";
import { useIntersectionObserver } from "hooks";
import ErrorBoundary from "components/ErrorBoundary";
import ImagePlaceholder from "components/ImagePlaceholder";

export default function Home() {
  const listPhotosParams = useMemo(() => {
    return {
      page: 1,
      per_page: 30,
    };
  }, []);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useListPhotos(listPhotosParams);

  const observerRef = useIntersectionObserver({
    forceStop: !hasNextPage,
    rootMargin: "300px",
    threshold: 0.1,
    callback: (isIntersecting) => {
      if (isIntersecting) fetchNextPage();
    },
  });

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const forceLoadCount = useBreakpointValue({
    base: 2,
    md: 4,
    lg: 6,
  }) as number;

  return (
    <ErrorBoundary>
      <MasonryGrid columns={columns || 1} spacing={4}>
        {data?.map((photo, index) => (
          <Box
            key={photo.id}
            mb={4}
            overflow="hidden"
            borderRadius="md"
            boxShadow="md"
            aspectRatio={photo.width / photo.height}
          >
            <Link
              to={`/photos/${photo.id}#${photo.width},${photo.height}`}
              aria-label={photo.alt || String(photo.id)}
            >
              <ErrorBoundary fallback={<ImagePlaceholder />}>
                <Image
                  src={photo.src.large}
                  alt={photo.alt}
                  borderRadius="md"
                  lazy={index >= forceLoadCount}
                  virtualized={true}
                />
              </ErrorBoundary>
            </Link>
          </Box>
        ))}
      </MasonryGrid>
      {hasNextPage && (
        <Flex ref={observerRef} w="100%" justifyContent="center">
          {isFetchingNextPage && (
            <Center mt={4}>
              <Spinner size="md" />
            </Center>
          )}
        </Flex>
      )}
    </ErrorBoundary>
  );
}
