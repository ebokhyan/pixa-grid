import {
  Box,
  Text,
  Flex,
  Link,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import Image from "components/Image";
import SectionWrapper from "components/SectionWrapper";
import { IPhoto, PhotoSource } from "types/photo";

interface IPhotoProps {
  data: IPhoto | null;
  isLoading: boolean;
  onBack: () => void;
}

export default function Photo({ data, isLoading, onBack }: IPhotoProps) {
  const thumbnail = useBreakpointValue({
    base: "large",
    md: "large2x",
  }) as keyof PhotoSource;
  const [width, height] = location.hash.slice(1).split(",").map(Number);

  const aspectRatio = width / height;

  const maxHeight = 0.8 * window.innerHeight;
  const maxWidth = maxHeight * aspectRatio;

  return (
    <>
      <SectionWrapper
        borderTopLeftRadius="16px"
        borderTopRightRadius="16px"
        maxW={maxWidth + "px"}
      >
        <Button
          variant="plain"
          color="white"
          pl={0}
          pr={1}
          minH="auto"
          h="auto"
          onClick={onBack}
        >
          Back
        </Button>
      </SectionWrapper>
      <Box
        w="100%"
        maxW={maxWidth + "px"}
        overflow="hidden"
        aspectRatio={aspectRatio}
      >
        <Image
          src={data?.src?.[thumbnail]}
          alt={data?.alt}
          display={isLoading ? "none" : "block"}
          maxHeight={maxHeight + "px"}
          height="100%"
          objectFit="contain"
          lazy={false}
        />
      </Box>
      <SectionWrapper
        borderBottomLeftRadius="16px"
        borderBottomRightRadius="16px"
        maxW={maxWidth + "px"}
      >
        <Text fontSize="lg" fontWeight="bold">
          {data?.alt}
        </Text>
        <Flex fontSize="sm" color="gray.300" mt={1}>
          <Link
            mr={4}
            href={data?.photographer_url}
            target="_blank"
            textDecoration="none"
            outline="none"
          >
            By: {data?.photographer}
          </Link>
        </Flex>
      </SectionWrapper>
    </>
  );
}
