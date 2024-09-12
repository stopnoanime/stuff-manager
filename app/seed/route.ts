// import { seedCategories, seedItems } from "@/app/_lib/data-seed";
// import { sql } from "@vercel/postgres";

// export async function GET() {
//   try {
//     await sql`BEGIN`;
//     await seedItems();
//     await seedCategories();
//     await sql`COMMIT`;

//     return Response.json({
//       message: `Database seeded successfully. You can delete 'app/seed/route.ts' now.`,
//     });
//   } catch (error) {
//     await sql`ROLLBACK`;
//     return Response.json({ error }, { status: 500 });
//   }
// }
