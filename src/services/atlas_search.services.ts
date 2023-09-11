import PropertyModel from "../database/models/property.model";

export async function atalsSearchingProrperty(loaction: any): Promise<any> {
  try {
    const pipeline = [
      {
        $search: {
          index: "default",
          text: { query: loaction, path: "location" },
        },
      },
    ];
    const matchResult = await PropertyModel.aggregate(pipeline);

    return matchResult;
  } catch (e) {
    throw new Error(e.message);
  }
}
