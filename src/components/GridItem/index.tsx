import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import Image from "components/Image";
import ImagePlaceholder from "components/ImagePlaceholder";
import { type IPhoto } from "types/photo";

interface IGridItemProps {
  photo: IPhoto;
  forceLoad: boolean;
}

export default function GridItem({ photo, forceLoad }: IGridItemProps) {
  return (
    <Box
      mb={4}
      overflow="hidden"
      borderRadius="md"
      boxShadow="md"
      aspectRatio={photo.width / photo.height}
    >
      <Link
        to={`/photos/${photo.id}#${photo.width},${photo.height}`}
        aria-label={photo.alt || String(photo.id)}
      >
        <ErrorBoundary fallback={<ImagePlaceholder />}>
          <Image
            src={photo.src.large}
            alt={photo.alt}
            borderRadius="md"
            lazy={forceLoad}
            virtualized={true}
          />
        </ErrorBoundary>
      </Link>
    </Box>
  );
}
