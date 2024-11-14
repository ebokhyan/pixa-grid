export type ListPhotosQueryParams =
  | {
      page?: number;
      perPage?: number;
    }
  | undefined;

export type ListPhotosResponse = {
  page: number;
  per_page: number;
  photos: IPhoto[];
  next_page: string;
};

export interface IPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface IPhotoUseCase {
  listPhotos: Core.InputCallType<ListPhotosQueryParams, ListPhotosResponse>;
}

export interface IPixelsService {
  listPhotos: Core.InputCallType<ListPhotosQueryParams, ListPhotosResponse>;
}
