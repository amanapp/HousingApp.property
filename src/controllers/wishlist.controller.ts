import { Response, Request } from "express";
import { wishlistProperty } from "../services/wishlist.services";
import { ExceptionMessage, HttpStatusCode } from "../constants/status.constants";


/**
 * @description wishlisted the property
 * @param req 
 * @param res 
 */
export const WishlistProperty = async (req: Request, res: Response) => {
  try {

    const { email, property_id } = req.body;
    const user = await wishlistProperty(email, property_id);
    res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.WISHLIST_ADD });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
