import PropertyModel from "../database/models/property.model";
import amqp from "amqplib/callback_api";

/**
 * @description recieve the property info (post creation by owner /broker)
 */
export async function propetyPost(): Promise<any> {
  try {
    amqp.connect("amqp://localhost", function (err, conn) {
      conn.createChannel(function (err, ch) {
        const queue = "message_queue_user";
        ch.assertQueue(queue, { durable: false });
        ch.consume(
          queue,
          async function (msg) {
            let result: any = msg.content.toString();
            const RESULTS = JSON.parse(result);
            await PropertyModel.insertMany({
              location: RESULTS.location,
              price: RESULTS.price,
              type: RESULTS.type,
              size: RESULTS.size,
              status: RESULTS.status,
              owner_id: RESULTS.owner_id,
            });
          },
          { noAck: true }
        );
      });
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description all property
 * @returns object of data
 */
export async function showProperty(): Promise<any> {
  try {
    const result = await PropertyModel.find({});
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
}
/**
 * @description fetch filters based on(Price, available, flat type(2bhk, 3bhk), listed by owner/broker).
 * @param price
 * @param type
 * @param size
 * @param posted_by
 * @returns result of object
 */
export async function showPropertyByUsingParametar(
  price: any,
  type: any,
  size: any,
  posted_by: any
): Promise<any> {
  try {
    const result = await PropertyModel.find({
      price: price,
      size: size,
      type: type,
      posted_by: posted_by,
    });
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description show all avilable property
 * @returns
 */
export async function showPropertyRent(): Promise<any> {
  try {
    const result = await PropertyModel.find({ status: "avilable" });
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description set the status of property (sold /fake)
 * @param property_id
 * @param flag
 * @returns object of data
 */
export async function showPropertyReport(
  property_id: Object,
  flag: String
): Promise<any> {
  try {
    const result = await PropertyModel.updateOne(
      { _id: property_id },
      { report: flag }
    );
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
}
