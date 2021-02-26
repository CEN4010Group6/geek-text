import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let database: PrismaService;

  let user;
  let book;

  let mockReview: any = {
    value: 5,
    description: '',
    postedAs: 'anonymous'
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    let r;

    if(r = await database.review.findFirst({ where: { userId: user?.id }})) {
      await database.review.delete({ where: { id: r.id }});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a method findAll', async () => {
    await expect(service.findAll).toBeDefined();
    let all = await service.findAll({});
    await expect(all).toBeDefined();
    await expect(all.length).toBeGreaterThan(0);
  });

  it('should have a method findOne', async () => {
    let review = await database.review.findFirst();
    await expect(review?.id).toBeDefined();
    await expect(service.findOne).toBeDefined();
    let one = await service.findOne({
      where: {
        id: review?.id
      }
    });
    await expect(one).toBeDefined();
    await expect(one?.id).toBe(review?.id);
  });

  it('should create a new Author in the database', async () => {
    await expect(service.create).toBeDefined();
    mockReview = await service.create(mockReview);
    await expect(mockReview).toBeDefined();
    await expect(mockReview.id).toBeDefined();
    await expect(mockReview.value).toBe(5);
  });

  it('should update an Author in the database', async () => {
    await expect(service.update).toBeDefined();
    mockReview = await database.review.findFirst({ where: { userId: user.id }});
    mockReview.value = 3;
    mockReview = await service.update({
      where: {
        id: mockReview.id
      },
      data: mockReview
    });
    expect(mockReview).toBeDefined();
    expect(mockReview.value).toBe(3);
  });

  it('should delete an Author from the database', async () => {
    await expect(service.delete).toBeDefined();
    mockReview = await database.review.findFirst({ where: { id: mockReview.id }});
    mockReview = await service.delete({ id: mockReview.id });
    const noGenre = await service.findOne({where : { id: mockReview.id }});
    await expect(noGenre).toBeNull();
  });
});
