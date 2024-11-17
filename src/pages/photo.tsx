import { useMemo } from "react";
import { Center, Container } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPhoto } from "core/hooks/photo";
import PhotoComponent from "components/Photo";

export default function Photo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const params = useMemo(() => {
    return { id: id as string };
  }, [id]);
  const { data, isLoading } = useGetPhoto(params);

  const onBack = () => {
    navigate(-1);
  };

  return (
    <Container maxW="2xl" minH="100vh" py={1}>
      <Center flexDirection="column" w="100%">
        <PhotoComponent data={data} isLoading={isLoading} onBack={onBack} />
      </Center>
    </Container>
  );
}
