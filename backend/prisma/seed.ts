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
import { fake } from 'faker';

const client = new PrismaClient();

async function main() {
  const password = 'IAmAPassword';
  const hash = await argon2.hash(password);

  const users: Prisma.UserCreateInput[] = [
    {
      email: 'john.doe@gmail.com',
      passwordHash: hash,
      firstName: 'John',
      lastName: 'Doe',
      creditCard: {
        create: {
          encryptedCreditCardNumber: faker.finance.creditCardNumber(),
          encryptedCCV: faker.finance.creditCardCVV()
        }
      },
      shippingAddress: {
        create: {
          street: faker.address.streetAddress(),
          apartmentOrUnit: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          country: faker.address.country(),
          zipcode: faker.address.zipCode()
        }
      }
    },
    {
      email: faker.internet.email(),
      passwordHash: hash,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profilePicture: faker.image.avatar()
    }
  ];

  for(let user of users) {
    await client.user.upsert({
      where: {
        email: user.email
      },
      update: user,
      create: user
    });
  }

  const books: Prisma.BookCreateInput[] = [
    {
      title: 'To Kill a Mockingbird',
      author: {
        create: {
          firstName: 'Harper',
          lastName: 'Lee',
          description: "Harper Lee was born in 1926 in Monroeville, Alabama. She is the author of the acclaimed To Kill a Mockingbird and Go Set a Watchman, which became a phenomenal #1 New York Times bestseller when it was published in July 2015. Ms. Lee received the Pulitzer Prize, the Presidential Medal of Freedom, and numerous other literary awards and honors. She died on February 19, 2016."
        }
      },
      publisher: {
        create: {
          name: 'HarperCollins Publishers'
        }
      },
      description: "Nominated as one of America’s best-loved novels by PBS’s The Great American Read\nHarper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred\nOne of the best-loved stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.",
      genre: {
        create: [
          {
            name: 'Fiction'
          }
        ]
      },
      price: 17.99,
      coverUrl: 'https://prodimage.images-bn.com/pimages/9780061120084_p0_v4_s600x595.jpg',
      isbn: 9780061120084,
    }
  ];

  for(let book of books) {
    await client.book.upsert({
      where: {
        title: book.title,
      },
      create: book,
      update: book
    });
  }

}

main()
  .catch(console.error)
  .finally(async () => {
    await client.$disconnect();
  });
