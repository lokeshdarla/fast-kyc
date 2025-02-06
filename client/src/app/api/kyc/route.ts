import dbConnect from "../../../utils/db";
import KycTransactionModel from "@/models/kycTransaction";


export async function POST(req: Request, res: any) {
  await dbConnect();
  try {
    const data = await req.json();
    const transaction = await KycTransactionModel.create(data);
    return Response.json(
      { transaction },
      { status: 201 }
    );


  } catch (error: any) {
    return Response.json(
      {
        error: error.message
      },
      { status: error.status }
    );

  }
}

//@ts-ignore
export async function GET({ req, res }) {
  await dbConnect();
  try {
    const interviews = await KycTransactionModel.find({});
    return Response.json(
      {
        success: true,
        data: interviews
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.log(error.message)
    return Response.json(
      {
        error: error.message
      },
      { status: error.status }
    );

  }
}
