import mongoose, { Document, Schema } from "mongoose";
interface User extends Document {
  name: string;
  email: string;
  password: string;
  phone_no: number;
  wishlist_id:object;
  visit_count:object;
  subscription_id:mongoose.Types.ObjectId;
  subscription_start:Date;
  subscription_end:Date;
  verification_key:Boolean;

}

const userSchema: Schema<User> = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, unique:true, required: true },
  password: { type: String, required: true },
  phone_no: { type: Number, required: true },
  wishlist_id: { type: Array, required: false },
  visit_count: { type: Array, required: false },
  verification_key: { type: Boolean, required: false },

  subscription_id:  {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'subscriptions',
    required: false,

  },
  subscription_start: { type: Date, },
  subscription_end: { type: Date,},
  
},{timestamps:true});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
