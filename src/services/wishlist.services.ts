import UserModel from "../database/models/user.model";
/**
 * @description wishlisted the property
 * @param email
 * @param property_id
 */
export async function wishlistProperty(
  email: string,
  property_id: object
): Promise<any> {
  try {
    let foundOwner: any = await UserModel.findOne({ email: email });
    const result = await UserModel.updateOne(
      { _id: foundOwner._id },
      { $push: { wishlist_id: property_id } }
    );
  } catch (e) {
    throw new Error(e.message);
  }
}
