export type ListPhotosQueryParams = {
  page: number;
  per_page: number;
};

export type ListPhotosResponse = {
  page: number;
  per_page: number;
  photos: IPhoto[];
  next_page: string;
  total_results: number;
};

export type PhotoSource = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
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
  src: PhotoSource;
  liked: boolean;
  alt: string;
}

export type GetPhotoParams = {
  id: string;
};

export interface IPhotoUseCase {
  listPhotos: Core.InputCallType<ListPhotosQueryParams, ListPhotosResponse>;
  getPhoto: Core.InputCallType<GetPhotoParams, IPhoto>;
}

export interface IPixelsService {
  listPhotos: Core.InputCallType<ListPhotosQueryParams, ListPhotosResponse>;
  getPhoto: Core.InputCallType<GetPhotoParams, IPhoto>;
}
