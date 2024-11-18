import { lazy, Suspense } from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import MasonryGrid from "components/MasonryGrid";
import { useIntersectionObserver } from "hooks";
import { type IPhoto } from "types/photo";

const Loader = lazy(() => import("components/Loader"));
const GridItem = lazy(() => import("components/GridItem"));

interface IPhotosProps {
  data: IPhoto[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function Photos({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: IPhotosProps) {
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
    <>
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
            <Suspense>
              <Loader size="md" />
            </Suspense>
          )}
        </Flex>
      )}
    </>
  );
}
