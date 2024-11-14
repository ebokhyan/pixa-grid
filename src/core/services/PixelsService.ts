import pixelsAxios from "@core/http/pixels";
import {
  IPixelsService,
  ListPhotosQueryParams,
  ListPhotosResponse,
} from "@types/photo";

export default function PixelsService(): IPixelsService {
  const listPhotos = async (
    params: ListPhotosQueryParams
  ): Promise<ListPhotosResponse> => {
    const response = await pixelsAxios.get<ListPhotosResponse>("/curated", {
      params,
    });
    return response.data;
  };

  return {
    listPhotos,
  };
}
