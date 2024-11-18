import pixelsAxios from "core/http/pixels";
import {
  type GetPhotoParams,
  type IPhoto,
  type IPixelsService,
  type ListPhotosQueryParams,
  type ListPhotosResponse,
} from "types/photo";

export default function PixelsService(): IPixelsService {
  const listPhotos = async (
    params: ListPhotosQueryParams
  ): Promise<ListPhotosResponse> => {
    const response = await pixelsAxios.get<ListPhotosResponse>("/curated", {
      params,
    });
    return response.data;
  };

  const getPhoto = async (params: GetPhotoParams): Promise<IPhoto> => {
    const response = await pixelsAxios.get<IPhoto>(`/photos/${params.id}`);

    return response.data;
  };

  return {
    listPhotos,
    getPhoto,
  };
}
