import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let module: TestingModule;
  let service: ReviewsService;
  let database: PrismaService;

  let user;
  let book;

  const mockReview: any = {
    value: 5,
    description: '',
    postedAs: 'anonymous'
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaService,
        ReviewsService
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    database = module.get<PrismaService>(PrismaService);

    user = await database.user.findFirst();
    book = await database.book.findFirst();

    mockReview.userId = user?.id;
    mockReview.bookId = book?.id;
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  })

  beforeEach(async () => {
    let r = await database.review.findFirst({ where: { userId: user?.id }});

    if(r && r?.id) {
      r = await database.review.findUnique({ where: { id: r.id }});
      if(r && r.id) {
        r = await database.review.findUnique({ where: { id: r.id }});
        await database.review.delete({ where: { id: r?.id }});
      }
    }
  });

  afterEach(async () => {
    let r = await database.review.findFirst({ where: { userId: user?.id }});

    if(r && r?.id) {
      await database.review.delete({ where: { id: r.id }});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method findAll', async () => {
    const review = await database.review.create({ data: mockReview });
    await expect(service.findAll).toBeDefined();
    let all = await service.findAll({});
    await expect(all).toBeDefined();
    await expect(all.length).toBeGreaterThan(0);
    await database.review.delete({ where: { id: review.id }});
  });

  it('should have a method findOne', async () => {
    await database.review.create({ data: mockReview });
    const review = await database.review.findFirst();
    await expect(review?.id).toBeDefined();
    await expect(service.findOne).toBeDefined();
    const one = await service.findOne({
      where: {
        id: review?.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(review?.id);
    await database.review.delete({ where: { id: review?.id }});
  });

  it('should create a new Review in the database', async () => {
    let mock = mockReview;
    await expect(service.create).toBeDefined();
    mock = await service.create(mock);
    await expect(mock).toBeDefined();
    await expect(mock.id).toBeDefined();
    await expect(mock.value).toBe(5);
  });

  it('should update an Review in the database', async () => {
    await expect(service.update).toBeDefined();
    let mock = await service.create(mockReview);
    mock.value = 3;
    mock = await service.update({
      where: {
        id: mock.id
      },
      data: mock
    });
    expect(mock).toBeDefined();
    expect(mock.value).toBe(3);
  });

  it('should delete an Review from the database', async () => {
    await expect(service.delete).toBeDefined();
    let mock = mockReview;
    mock = await database.review.create({ data: mock });
    mock = await database.review.findUnique({ where: { id: mock.id }});
    mock = await service.delete({ id: mock.id });
    const noGenre = await service.findOne({where : { id: mock.id }});
    await expect(noGenre).toBeUndefined();
  });
});
