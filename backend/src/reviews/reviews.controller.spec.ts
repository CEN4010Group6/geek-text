
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let module: TestingModule;
  let controller: ReviewsController;
  let database: PrismaService;
  let utility: UtilityService;

  const mockReview: any = {
    value: 5,
    description: '',
    postedAs: 'anonymous'
  };

  let user;
  let book;

  beforeAll(async () => {
    module = await Test.createTestingModule({
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

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  });

  beforeEach(async () => {
    const r = await database.review.findFirst({ where: { userId: user.id, bookId: book.id }});

    if(r?.id) {
      database.review.delete({ where: { id: r.id }});
    }
  });

  afterEach(async () => {
    const r = await database.review.findFirst({ where: { userId: user.id, bookId: book.id }});

    if(r?.id) {
      database.review.delete({ where: { id: r.id }});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const first = await database.review.create({ data: mockReview });
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.ReviewSelect;
    const cursor = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.ReviewWhereUniqueInput;
    const orderBy = await utility.convertOtoB({ value: 'asc' }) as unknown as Prisma.ReviewOrderByInput;
    const where = await utility.convertOtoB({ id: first?.id }) as unknown as Prisma.ReviewWhereInput;
    await expect(controller.findAll).toBeDefined();
    let findAll = await controller.findAll(0, 10, cursor, where, orderBy, select);
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThanOrEqual(0);

    findAll = await controller.findAll();
    await expect(findAll).toBeDefined();
    await expect(findAll.length).toBeGreaterThanOrEqual(0);
  });

  it('should have a method findOne', async () => {
    const select = await utility.convertOtoB({ id: true }) as unknown as Prisma.ReviewSelect;
    await expect(controller.findOne).toBeDefined();
    const review = await database.review.create({ data: mockReview })
    const findOne = await controller.findOne(review?.id as string, select);
    await expect(findOne).toBeDefined();
  });

  it('should have a method create', async () => {
    await expect(controller.create).toBeDefined();
    let mock = mockReview;
    mock = await controller.create(mock);
    await expect(mockReview).toBeDefined();
    await expect(mockReview.value).toBe(5);
  });

  it('should have a method update', async () => {
    await expect(controller.update).toBeDefined();
    let mock = mockReview;
    mock = await database.review.create({ data: mock });
    mock.value = 3;
    mock = await controller.update(mock.id, mock);
    await expect(mock).toBeDefined();
    await expect(mock.value).toBe(3);
  });

  it('should have a method delete', async () => {
    await expect(controller.delete).toBeDefined();
    let mock = mockReview;
    mock = await database.review.create({ data: mock });
    mock = await database.review.findUnique({ where: { id: mock.id }});
    mock = await controller.delete(mock.id);
    const testBook = await controller.findOne(mock.id);
    expect(testBook).toBeNull();
  });
});
