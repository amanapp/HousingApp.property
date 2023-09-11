import { Response, Request } from "express";
import { ExceptionMessage, HttpStatusCode } from "../constants/status.constants";
import { atalsSearchingProrperty } from "../services/atlas_search.services";


export const AtalsSearchingProrperty = async (req: Request, res: Response) => {
    try {
  
      const { loaction } = req.query;
      const user = await atalsSearchingProrperty(loaction);
      res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.PROPERTY_SEARCH ,user});
    } catch (e) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  };