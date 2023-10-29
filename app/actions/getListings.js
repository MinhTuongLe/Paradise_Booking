// import prisma from "@/lib/prismadb";

// export default async function getListings(params) {
//   try {
//     const {
//       userId,
//       roomCount,
//       guestCount,
//       bathroomCount,
//       locationValue,
//       startDate,
//       endDate,
//       category,
//     } = params;

//     let query = {};

//     if (userId) {
//       query.userId = userId;
//     }

//     if (category) {
//       query.category = category;
//     }

//     if (roomCount) {
//       query.roomCount = {
//         gte: +roomCount,
//       };
//     }

//     if (guestCount) {
//       query.guestCount = {
//         gte: +guestCount,
//       };
//     }

//     if (bathroomCount) {
//       query.bathroomCount = {
//         gte: +bathroomCount,
//       };
//     }

//     if (locationValue) {
//       query.locationValue = locationValue;
//     }

//     if (startDate && endDate) {
//       query.NOT = {
//         reservations: {
//           some: {
//             OR: [
//               {
//                 endDate: { gte: startDate },
//                 startDate: { lte: startDate },
//               },
//               {
//                 startDate: { lte: endDate },
//                 endDate: { gte: endDate },
//               },
//             ],
//           },
//         },
//       };
//     }

//     const listing = await prisma.listing.findMany({
//       where: query,
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     const safeListings = listing.map((list) => ({
//       ...list,
//       createdAt: list.createdAt.toISOString(),
//     }));

//     return safeListings;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

import fs from "fs";

export default async function getListings(params) {
  try {
    const data = fs.readFileSync("../../mock-data/listing.json", "utf8");
    const listing = JSON.parse(data).listings;
    const safeListings = listing.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    throw new Error(error.message);
  }
}
