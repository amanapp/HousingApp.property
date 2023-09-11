import { Response, Request } from "express";
import {
  propetyPost,
  showProperty,
  showPropertyByUsingParametar,
  showPropertyRent,
  showPropertyReport,
} from "../services/property.services";
import { ExceptionMessage, HttpStatusCode } from "../constants/status.constants";


/**
 * @description add proprty details
 * @param req 
 * @param res 
 */
export const PropertPost = async (req: Request, res: Response) => {
  try {
    const user = await propetyPost();
    res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.PROPERTY_POST});
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};


/**
 * @description show all property
 * @param req 
 * @param res 
 */
export const ShowProperty = async (req: Request, res: Response) => {
  try {
    const Result = await showProperty();
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: ExceptionMessage.PROPERTY_SHOW, property_detilas: Result });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};

/**
 * @description fetch filters based on(Price, available, flat type(2bhk, 3bhk), listed by owner/broker)
 * @param req 
 * @param res 
 */
export const ShowPropertyByUsingParametar = async (req: Request,res: Response) => {
  try {
   const {price,type, size,posted_by}=req.query;
    const Result = await showPropertyByUsingParametar(price,type, size,posted_by);
    res
      .status(HttpStatusCode.ACCEPTED)
      .json({ message: ExceptionMessage.PROPERTY_SHOW, property_detilas: Result });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};


/**
 * @description show prorperty Rent
 * @param req 
 * @param res 
 */
export const ShowPropertyRent = async (req: Request, res: Response) => {
  try {
    const Result = await showPropertyRent();
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: ExceptionMessage.PROPERTY_SHOW, property_detilas: Result });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
/**
 * @description set the status of property (sold /fake)
 * @param req 
 * @param res 
 */
export const ShowPropertyReport = async (req: Request, res: Response) => {
  try {
    const { property_id, flag } = req.body;
    const Result = await showPropertyReport(property_id, flag);
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: "report add sucessfully", property_detilas: Result });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
