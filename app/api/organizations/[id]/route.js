import connectMongoDB from "@/lib/mongodb";
import Organization from "@/models/Organization";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const organization = await Organization.findOne({ _id: id });

    return NextResponse.json({ organization }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

// import connectMongoDB from "@/lib/mongodb";
// import Organization from "@/models/Organization";
// import { NextResponse } from "next/server";

// export async function PUT(request, { params }) {
//   try {
//     console.log(params);
//     const { id } = params;
//     const {
//       newEmail: email,
//       newPassword: password,
//       newAddrLine1: addrLine1,
//       newAddrLine2: addrLine2,
//       newCity: city,
//       newState: state,
//       newZip: zip,
//       newPhone: phone,
//     } = await request.json();
//     await connectMongoDB();
//     await Organization.findByIdAndUpdate(id, {
//       email,
//       password,
//       addrLine1,
//       addrLine2,
//       city,
//       state,
//       zip,
//       phone,
//     });
//     return NextResponse.json({ message: "Topic updated" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Server error", error },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request, { params }) {
//   try {
//     const { id } = params;
//     await connectMongoDB();
//     const organization = await Organization.findOne({ _id: id });
//     return NextResponse.json({ organization }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Server error", error },
//       { status: 500 }
//     );
//   }
// }
