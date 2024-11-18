import { useMemo, lazy, Suspense } from "react";
import { Center, Spinner, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useListPhotos } from "core/hooks/photo";
import MasonryGrid from "components/MasonryGrid";
import { useIntersectionObserver } from "hooks";
import ErrorBoundary from "components/ErrorBoundary";

const GridItem = lazy(() => import("components/GridItem"));

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
          <Suspense key={photo.id}>
            <GridItem photo={photo} forceLoad={index >= forceLoadCount} />
          </Suspense>
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
