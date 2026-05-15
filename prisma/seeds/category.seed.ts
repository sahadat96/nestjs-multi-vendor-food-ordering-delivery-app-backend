import { PrismaClient } from '@prisma/client';

export async function seedFoodCategories(prisma: PrismaClient): Promise<void> {
  const categories = [
    'Popular Items',
    'Breakfast',
    'Burgers',
    'Pizza',
    'Tacos & Burritos',
    'Sandwiches & Wraps',
    'Rice Bowls',
    'Noodles & Pasta',
    'BBQ & Grilled',
    'Chicken',
    'Seafood',
    'Vegetarian',
    'Vegan',
    'Halal',
    'Salads',
    'Soups',
    'Sides',
    'Desserts',
    'Drinks',
    'Combo Meals',
  ];

  for (const [index, name] of categories.entries()) {
    await prisma.category.upsert({
      where: {
        name,
      },
      update: {
        position: index,
        isActive: true,
      },
      create: {
        name,
        position: index,
        isActive: true,
      },
    });
  }

  console.log(`Food categories seeded: ${categories.length}`);
}