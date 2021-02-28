import { Test, TestingModule } from '@nestjs/testing';
import { UtilityService } from './utility.service';

describe('UtilitiesService', () => {
  let module: TestingModule;
  let service: UtilityService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ UtilityService ],
    }).compile();

    service = module.get<UtilityService>(UtilityService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert a base64 string into an object', async () => {
    const obj = await service.convertBtoO('eyJyYXRpbmciOnRydWV9');
    await expect(obj).toStrictEqual({"rating": true});
  });

  it('should convert an object into a base64 string', async () => {
    const expected = 'eyJyYXRpbmciOnRydWV9'
    const obj = { "rating": true };
    const str = await service.convertOtoB(obj);
    await expect(str).toBeDefined();
    await expect(str).toBe(expected);
  })
});
