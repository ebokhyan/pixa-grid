import { useQuery } from "@tanstack/react-query";
import photoFactory from "@core/factory/photo";
import { ListPhotosQueryParams } from "@types/photo";

export function useListPhotos(params?: ListPhotosQueryParams) {
  const query = useQuery({
    queryKey: ["photos"],
    queryFn: () => photoFactory.listPhotos(params),
  });

  return query;
}
