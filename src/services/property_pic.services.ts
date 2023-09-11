import PropertyModel from "../database/models/property.model";
import amqp from "amqplib/callback_api";
import { logger } from "../middleware/winsdon.middleware";

/**
 * @description resive the propety pic
 */
export async function propertyPicAdd(): Promise<any> {
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
            console.log("result ::: ",RESULTS)
            const owner_id: any = RESULTS.owner_id;

            const findOwner = await PropertyModel.findOne({ owner_id });
           console.log("find owner :: ",findOwner)
            PropertyModel.updateOne(
              { owner_id: owner_id },
              { pic: RESULTS.buffer }
            ).then(()=>{logger.log({level:"info",message:"pic add sucessfully !! "})})
          },
          { noAck: true }
        );
      });
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
