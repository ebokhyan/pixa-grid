import { Image } from "@chakra-ui/react";

export default function ImagePlaceholder() {
  return (
    <Image
      src="/placeholder.webp"
      alt="Placeholder"
      width="100%"
      height="100%"
      objectFit="cover"
    />
  );
}
