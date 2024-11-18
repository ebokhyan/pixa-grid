import { Suspense, lazy, useMemo } from "react";
import { useListPhotos } from "core/hooks/photo";
import ErrorBoundary from "components/ErrorBoundary";
import Loader from "components/Loader";

const Photos = lazy(() => import("components/Photos"));

export default function Home() {
  const listPhotosParams = useMemo(() => {
    return {
      page: 1,
      per_page: 30,
    };
  }, []);
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useListPhotos(listPhotosParams);

  return (
    <ErrorBoundary>
      {isLoading ? (
        <Loader size="xl" wrapperHeight="100vh" />
      ) : (
        <Suspense>
          <Photos
            data={data}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Suspense>
      )}
    </ErrorBoundary>
  );
}
