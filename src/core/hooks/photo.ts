import { useEffect, useRef, useState } from "react";
import { ListPhotosQueryParams, GetPhotoParams, IPhoto } from "types/photo";
import photoFactory from "core/factory/photo";
import { shouldThrottle } from "core/helpers";

interface IUseListPhotosResult {
  data: IPhoto[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
}

export function useListPhotos(
  params: ListPhotosQueryParams
): IUseListPhotosResult {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [page, setPage] = useState<number>(params.page || 1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const lastFetchTimeRef = useRef<number>(0);
  const lastPageChangeTimeRef = useRef<number>(0);

  useEffect(() => {
    let isCancelled = false;
    if (shouldThrottle(lastFetchTimeRef, 300)) {
      return;
    }

    const fetchPhotos = async (pageToFetch: number) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await photoFactory.listPhotos({
          ...params,
          page: pageToFetch,
        });

        if (!isCancelled) {
          setPhotos((prevPhotos) =>
            pageToFetch === 1
              ? response.photos
              : [...prevPhotos, ...response.photos]
          );

          const totalPages = Math.ceil(
            response.total_results / response.per_page
          );
          setHasNextPage(pageToFetch < totalPages);
          setHasPreviousPage(pageToFetch > 1);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to fetch photos:", error);
          setIsError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchPhotos(page);
    return () => {
      isCancelled = true; // Cancel the fetch if component unmounts or `page` changes
    };
  }, [page, params]);

  const fetchNextPage = () => {
    if (shouldThrottle(lastPageChangeTimeRef, 300)) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  const fetchPreviousPage = () => {
    if (shouldThrottle(lastFetchTimeRef, 300)) {
      return;
    }
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return {
    data: photos,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage: false,
    isLoading,
    isError,
  };
}

export function useGetPhoto(params: GetPhotoParams) {
  const [photo, setPhoto] = useState<IPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const lastFetchTimeRef = useRef<number>(0);

  useEffect(() => {
    if (shouldThrottle(lastFetchTimeRef, 300)) {
      return;
    }

    const fetchPhoto = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await photoFactory.getPhoto(params);
        setPhoto(response);
      } catch (error) {
        console.error("Failed to fetch photo:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [params]);

  return {
    data: photo,
    isLoading,
    isError,
  };
}
