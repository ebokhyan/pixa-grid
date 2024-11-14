import PixelsService from "@core/services/PixelsService";
import photoUseCase from "./photoUseCase";

const photoFactory = photoUseCase(PixelsService());

export default photoFactory;
