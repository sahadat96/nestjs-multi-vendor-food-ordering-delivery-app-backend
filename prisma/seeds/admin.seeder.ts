import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(prisma: PrismaClient): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin@123456';
  const adminName = process.env.ADMIN_NAME ?? 'Super Admin';

  const adminRole = await prisma.role.findUnique({
    where: {
      name: 'ADMIN',
    },
    select: {
      id: true,
    },
  });

  if (!adminRole) {
    throw new Error(
      'ADMIN role not found. Please run role seed before admin seed.',
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
    select: {
      id: true,
    },
  });

  if (existingAdmin) {
    await prisma.user.update({
      where: {
        email: adminEmail,
      },
      data: {
        name: adminName,
        password: hashedPassword,
        roleId: adminRole.id,
        provider: 'local',
        isEmailVerified: true,
      },
    });

    console.log(`Admin user updated and verified: ${adminEmail}`);
    return;
  }

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      provider: 'local',
      roleId: adminRole.id,
      isEmailVerified: true,
    },
  });

  console.log(`Admin user created and verified: ${adminEmail}`);
}