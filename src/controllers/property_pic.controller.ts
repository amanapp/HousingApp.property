import { Response, Request } from "express";
import { propertyPicAdd } from "../services/property_pic.services";
import { ExceptionMessage, HttpStatusCode } from "../constants/status.constants";

/**
 * @description add propety pic 
 * @param req 
 * @param res 
 */
export const PropertyPicAdd = async (req: Request, res: Response) => {
  try {
    const user = await propertyPicAdd();

    res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.PIC_UPLOAD });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
