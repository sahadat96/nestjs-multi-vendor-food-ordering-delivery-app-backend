import { PrismaClient } from '@prisma/client';

export async function seedReviewTags(prisma: PrismaClient): Promise<void> {
  const tags = [
    'Fast Service',
    'Tasty',
    'Fresh Ingredients',
    'Great Portion',
    'Friendly Staff',
    'Worth the Price',
    'Good Packaging',
    'Value for Money',
    'Clean Truck',
    'Quick Pickup',
    'Good Customer Service',
  ];

  for (const name of tags) {
    await prisma.vendorTruckReviewTag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Vendor truck review tags seeded');
}
