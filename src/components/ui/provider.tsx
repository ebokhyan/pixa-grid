import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

interface IThemeProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: IThemeProviderProps) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
