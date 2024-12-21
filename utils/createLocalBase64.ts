// import fs from 'fs/promises'
// import path from 'path'
// import { getPlaiceholder } from 'plaiceholder'

// export async function createLocalBase64(imagePath: string): Promise<string | null> {
//   try {
//     let buffer: Buffer;

//     if (imagePath.startsWith('http')) {
//       // For remote images
//       const response = await fetch(imagePath);
//       buffer = Buffer.from(await response.arrayBuffer());
//     } else {
//       // For local images
//       const publicDirectory = path.join(process.cwd(), 'public');
//       const filePath = path.join(publicDirectory, imagePath);
//       buffer = await fs.readFile(filePath);
//     }

//     const { base64 } = await getPlaiceholder(buffer);
//     return base64;
//   } catch (e) {
//     if (e instanceof Error) console.error(`Error processing ${imagePath}:`, e.stack);
//     return null;
//   }
// }

// export const getCategoryImage = (categoryId: string): string => {
//   return `/public/${categoryId.replace(/\s+/g, '-').toLowerCase()}.webp`;
// };

