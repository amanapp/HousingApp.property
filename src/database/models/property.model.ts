import mongoose, { Document, Schema } from "mongoose";
// import OwnerModel from '../../../../users/src/database/models/owner.model';

interface Property extends Document {
  location: string;
  pic: Buffer;
  type: string;
  size: string;
  price:bigint;
  status:string;
  report:string;
  posted_by:string;
  owner_id:mongoose.Types.ObjectId;

}

const propertySchema: Schema<Property> = new Schema<Property>({
  location: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  posted_by: { type: String, required: false },

  pic: { 
    type: Buffer,
    contentType: String
   },
  status: { type: String, required: false },
  report:{ type: String, required: false },
  owner_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'owners',
    required: true,

  },
},{timestamps:true});

const PropertyModel = mongoose.model<Property>("Property", propertySchema);

export default PropertyModel;
