import { PrismaClient } from '@prisma/client';

export async function seedFoodReviewTags(prisma: PrismaClient): Promise<void> {
  const tags = [
    'Tasty',
    'Fresh', 
    'Spicy', 
    'Good' ,
    'Portion', 
    'Too', 
    'Salty'
  ];

  for (const name of tags) {
    await prisma.foodReviewTag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Food review tags seeded');
}