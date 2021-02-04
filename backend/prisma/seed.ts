import {
  PrismaClient,
  User,
  Book,
  Publisher,
  Author,
  CreditCard,
  Genre,
  Rating,
  Address,
  Transaction,
  Prisma
} from '@prisma/client';
import * as faker from 'faker';
import * as argon2 from 'argon2';

const client = new PrismaClient();

async function main() {
  const password = 'IAmAPassword';
  const hash = await argon2.hash(password);

  const user1: User = await client.user.create({
    data: {
      email: faker.internet.email(),
      passwordHash: hash,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profilePicture: faker.image.avatar()
    }
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await client.$disconnect();
  });
