import { IsDataURI } from 'class-validator';
import {
  PrismaClient,
  User,
  Book,
  Publisher,
  Author,
  CreditCard,
  Genre,
  Review,
  Address,
  Transaction,
  Prisma,
  prisma
} from '@prisma/client';
import * as faker from 'faker';
import * as argon2 from 'argon2';
import { List, Map } from 'immutable';
import * as dataURIs from './data_uri.json';
import authors from './authors.json';

const client = new PrismaClient();

async function main() {

  const password = 'IAmAPassword';
  const hash = await argon2.hash(password);

  const cc = faker.finance.creditCardNumber();
  const lastFour = cc.substring(cc.length - 4, cc.length);

  let users: List<User> = List();
  let books: List<Book> = List();
  let genres: Map<string, Genre> = Map();


  const john = await client.user.upsert({
    where: {
      email: 'john.doe@gmail.com'
    },
    update: {
      nickName: 'JDoe',
      roles: {
        connectOrCreate: {
          where: {
            name: 'user'
          },
          create: {
            name: 'user'
          }
        }
      }
    },
    create: {
      email: 'john.doe@gmail.com',
      passwordHash: hash,
      firstName: 'John',
      lastName: 'Doe',
      nickName: 'JDoe',
      creditCards: {
        create: {
          encryptedCreditCardNumber: cc,
          encryptedCCV: faker.finance.creditCardCVV(),
          lastFourDigits: lastFour,
          expirationDate: new Date()
        }
      },
      shippingAddresses: {
        create: {
          street: faker.address.streetAddress(),
          apartmentOrUnit: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          country: faker.address.country(),
          zipcode: faker.address.zipCode()
        }
      },
      roles: {
        connectOrCreate: [
            {
            where: {
              name: 'admin'
            },
            create: {
              name: 'admin'
            }
          },
          {
            where: {
              name: 'user'
            },
            create: {
              'name': 'user'
            }
          }
        ],
      },
    }
  });

  users = users.push(john);

  const jane = await client.user.upsert({
    where: {
      email: 'jane.doe@gmail.com'
    },
    update: {
      nickName: 'Janey'
    },
    create: {
      email: 'jane.doe@gmail.com',
      passwordHash: hash,
      firstName: 'Jane',
      lastName: 'Doe',
      nickName: 'Janey',
      roles: {
        connectOrCreate: {
          where: {
            name: 'user'
          },
          create: {
            name: 'user'
          }
        }
      }
    }
  });

  users = users.push(jane);

  const userCount = await client.user.count();

  for(let i = userCount; i < 8; i++) {
    const newUser = {
      email: faker.internet.email(),
      passwordHash: await argon2.hash('TheElectricSlide'),
      firstName: faker.name.firstName(),
      middleName: faker.name.middleName(),
      lastName: faker.name.lastName(),
      nickName: faker.name.jobTitle(),
      roles: {
        connectOrCreate: {
          where: {
            name: 'user'
          },
          create: {
            name: 'user'
          }
        }
      }
    }

    const dbUser =  await client.user.upsert({
      where: {
        email: newUser.email
      },
      update: newUser,
      create: newUser
    });

    users = users.push(dbUser)
  }

  for(let genre of ['Fiction', 'Fantasy', 'Romance', 'Philosophy', 'Young Adult', 'Self-Help', 'Sci-fi', 'Non-Fiction', 'Biography', 'Mystery']) {
    genres = genres.set(genre, await client.genre.upsert({
      where: { name: genre },
      update: {},
      create: { name: genre }
    }));
  }

  books = books.push(await client.book.upsert({
    where: {
      title: 'To Kill a Mockingbird',
    },
    update: {
      coverDataUri: dataURIs.toKillAMockingBird,
      sold: faker.random.number(),
      authors: {
        connectOrCreate: {
          where: {
              firstName_middleName_lastName: {
              firstName: authors.harperLee.firstName,
              middleName: authors.harperLee.middleName,
              lastName: authors.harperLee.lastName
            }
          },
          create: authors.harperLee
        }
      }
    },
    create: {
      title: 'To Kill a Mockingbird',
      authors: {
        connectOrCreate: {
          where: {
            firstName_middleName_lastName: {
              firstName: authors.harperLee.firstName,
              middleName: authors.harperLee.middleName,
              lastName: authors.harperLee.lastName
            }
          },
          create: authors.harperLee
        }
      },
      publisher: {
        create: {
          name: 'HarperCollins Publishers LLC' ,
          city: 'New York',
          state: 'NY',
          website: 'http://www.harpercollins.com/'
        }
      },
      publishYear: 2015,
      description: "Nominated as one of America’s best-loved novels by PBS’s The Great American Read\nHarper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred\nOne of the best-loved stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.",
      genres: { connect: { id: 1 }},
      price: 17.99,
      coverUrl: 'https://prodimage.images-bn.com/pimages/9780061120084_p0_v4_s600x595.jpg',
      coverDataUri: dataURIs.toKillAMockingBird,
      isbn: 9780061120084,
      reviews: {
        create: [{
          value: 3,
          description: faker.lorem.paragraph(),
          userId: users.get(0)?.id || 'abcd'
        }]
      },
      sold: faker.random.number()
    }
  }));

  books = books.push(await client.book.upsert({
    where: {
      title: 'Go Set A Watchman'
    },
    update: {
      coverDataUri: dataURIs.goSetAWatchman,
      sold: faker.random.number(),
      authors: {
        connectOrCreate: {
          where: {
            firstName_middleName_lastName: {
              firstName: authors.harperLee.firstName,
              middleName: authors.harperLee.middleName,
              lastName: authors.harperLee.lastName
            }
          },
          create: authors.harperLee
        }
      }
    },
    create: {
      title: 'Go Set A Watchman',
      authors: {
        connectOrCreate: {
          where: {
            firstName_middleName_lastName: {
              firstName: 'Harper',
              middleName: '',
              lastName: 'Lee'
            }
          },
          create: authors.harperLee
        }
      },
      publishYear: 2015,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4e/US_cover_of_Go_Set_a_Watchman.jpg',
      coverDataUri: dataURIs.goSetAWatchman,
      publisher: {
        connect: { name: 'HarperCollins Publishers LLC' }
      },
      genres: {
        connect: {
          id: 1
        }
      },
      description: "Go Set a Watchman is a novel by Harper Lee written before the Pulitzer Prize–winning To Kill a Mockingbird, her first and only other published novel (1960). Although initially promoted as a sequel by its publisher, it is now accepted as being a first draft of To Kill a Mockingbird with many passages being used again.",
      isbn: 9780062409850,
      price: 5.99,
      sold: faker.random.number()
    }
  }))

  const jSMill = {
    firstName: 'John',
    middleName: 'Stuart',
    lastName: 'Mill'
  }

  books = books.push(await client.book.upsert({
    where: {
      title: 'On Liberty'
    },
    update: {
      authors: {
        connectOrCreate: {
          where: {
            firstName_middleName_lastName: {
              firstName: authors.jSMills.firstName,
              middleName: authors.jSMills.middleName,
              lastName: authors.jSMills.lastName
            },
          },
          create: authors.jSMills
        }
      }
    },
    create: {
      title: 'On Liberty',
      authors: {
        connectOrCreate: {
          where: {
            firstName_middleName_lastName: {
              firstName: authors.jSMills.firstName,
              middleName: authors.jSMills.middleName,
              lastName: authors.jSMills.lastName
            }
          },
          create: authors.jSMills
        }
      },
      publisher: {
        create: {
          name: 'Dover Publications',
          city: 'Mineola',
          state: 'NY',
          website: 'https://doverpublications.com/'
        }
      },
      publishYear: 2002,
      description: "Discussed and debated from time immemorial, the concept of personal liberty went without codification until the 1859 publication of On Liberty. John Stuart Mill's complete and resolute dedication to the cause of freedom inspired this treatise, an enduring work through which the concept remains well known and studied.\nThe British economist, philosopher, and ethical theorist's argument does not focus on \"the so-called Liberty of the Will…but Civil, or Social Liberty: the nature and limits of the power which can be legitimately exercised by society over the individual.\" Mill asks and answers provocative questions relating to the boundaries of social authority and individual sovereignty. In powerful and persuasive prose, he declares that there is \"one very simple principle\" regarding the use of coercion in society — one may only coerce others either to defend oneself or to defend others from harm.\nThe new edition offers students of political science and philosophy, in an inexpensive volume, one of the most influential studies on the nature of individual liberty and its role in a democratic society.",
      genres: {
        connect: {
          id: 2
        }
      },
      isbn: Number("0486421309"),
      price: 4.00,
      coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555338584l/385228._SY475_.jpg'
    }
  }));

  const bookCount = await client.book.count();

  for(let i = bookCount; i < 30; i++) {
    const newBook = {
      title: faker.commerce.productName(),
      price: faker.random.float({ min: 2.00, max: 20.00 }),
      isbn: faker.random.number({ min: 1000000000000, max: 9999999999999}),
      authors: {
        create: [{
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          description: faker.lorem.paragraph()
        }]
      },
      description: faker.lorem.paragraphs(2),
      publisher: {
        create: {
          name: faker.company.companyName(),
          city: faker.address.city(),
          state: faker.address.stateAbbr()
        }
      },
      publishYear: 2009,
      genres: {
        connect: {
          id: faker.random.number({ min: 1, max: 10 })
        }
      },
      coverUrl: faker.image.imageUrl(395, 595),
      sold: faker.random.number({max: 50})
    }

    const book = await client.book.upsert({
      where: {
        title: newBook.title
      },
      update: {},
      create: newBook
    });

    books = books.push(book);
  }

  for(let i = 0; i < 25; i++) {
    const randomBookNumber = faker.random.number({
      min: 0,
      max: books.count() - 1
    });

    const randomUserNumber = faker.random.number({
      min: 0,
      max: users.count() -1
    });

    const posted = ['anonymous', 'nickName', 'realName']
    const postedNum = faker.random.number({ min:0, max: 2 });

    const user = users.get(randomUserNumber);
    const book = books.get(randomBookNumber);

    if(user && book) {
      const _review = await client.review.create({
        data: {
          value: faker.random.number({min: 1, max: 5}),
          description: faker.lorem.paragraph(),
          postedAs: posted[postedNum],
          book: {
            connect: {
              id: book.id
            }
          },
          user: {
            connect: {
              id: user.id
            }
          }
        }
      });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
