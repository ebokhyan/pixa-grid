import { Center, Spinner, type SpinnerProps } from "@chakra-ui/react";

interface ILoaderProps extends SpinnerProps {
  wrapperHeight?: string;
}

export default function Loader({ size, wrapperHeight }: ILoaderProps) {
  return (
    <Center h={wrapperHeight}>
      <Spinner size={size} />
    </Center>
  );
}
