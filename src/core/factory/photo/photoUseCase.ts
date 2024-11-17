import {
  GetPhotoParams,
  IPhoto,
  IPhotoUseCase,
  ListPhotosQueryParams,
  ListPhotosResponse,
} from "types/photo";
import PixelsService from "core/services/PixelsService";

export default function photoUseCase(
  pixelsService: ReturnType<typeof PixelsService>
): IPhotoUseCase {
  const listPhotos = (
    params: ListPhotosQueryParams
  ): Promise<ListPhotosResponse> => pixelsService.listPhotos(params);

  const getPhoto = (params: GetPhotoParams): Promise<IPhoto> =>
    pixelsService.getPhoto(params);

  return {
    listPhotos,
    getPhoto,
  };
}
