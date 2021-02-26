
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let database: PrismaService;
  let utility: UtilityService;

  let mockReview: any = {
    value: 5,
    description: '',
    postedAs: 'anonymous'
  };

  let user;
  let book;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        ReviewsService,
        UtilityService
      ],
      controllers: [ ReviewsController ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    database = module.get<PrismaService>(PrismaService);
    utility = module.get<UtilityService>(UtilityService);

    user = await database.user.findFirst();
    book = await database.book.findFirst();

    mockReview.userId = user?.id;
    mockReview.bookId = book?.id;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.ReviewSelect;
    const first = await database.review.findFirst();
    const cursor = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.ReviewWhereUniqueInput;
    const orderBy = await utility.convertOtoB({ value: 'asc' }) as unknown as Prisma.ReviewOrderByInput;
    const where = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.ReviewWhereInput;
    await expect(controller.findAll).toBeDefined();
    let findAll = await controller.findAll(0, 10, cursor, where, orderBy, select);
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);

    findAll = await controller.findAll();
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.ReviewSelect;
    await expect(controller.findOne).toBeDefined();
    const review = await database.review.findFirst();
    const findOne = await controller.findOne(review?.id as string, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    mockReview = await controller.create(mockReview);
    await expect(mockReview).toBeDefined();
    await expect(mockReview.value).toBe(5);
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    mockReview = await database.review.findFirst({ where: { userId: user.id }})
    mockReview.value = 3;
    mockReview = await controller.update(mockReview.id, mockReview);
    await expect(mockReview).toBeDefined();
    await expect(mockReview.value).toBe(3);
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    await expect(mockReview).toBeDefined();
    mockReview = await database.review.findFirst({ where: { userId: user.id }});
    mockReview = await controller.delete(mockReview.id);
    const testBook = await controller.findOne(mockReview.id);
    expect(testBook).toBeNull();
  });
});
