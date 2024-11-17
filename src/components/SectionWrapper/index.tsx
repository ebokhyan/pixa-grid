import { Box, type BoxProps } from "@chakra-ui/react";

interface ISectionWrapperProps extends BoxProps {
  children: React.ReactNode;
}

export default function SectionWrapper({
  children,
  ...props
}: ISectionWrapperProps) {
  return (
    <Box color="white" w="100%" bg="gray.400" py={3} px={2} {...props}>
      {children}
    </Box>
  );
}
