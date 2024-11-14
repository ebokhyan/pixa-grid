import {
  IPhotoUseCase,
  ListPhotosQueryParams,
  ListPhotosResponse,
} from "@types/photo";
import PixelsService from "@core/services/PixelsService";

export default function photoUseCase(
  pixelsService: ReturnType<typeof PixelsService>
): IPhotoUseCase {
  const listPhotos = (
    queryParams: ListPhotosQueryParams
  ): Promise<ListPhotosResponse> => pixelsService.listPhotos(queryParams);

  return {
    listPhotos,
  };
}
