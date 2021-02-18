import { Test, TestingModule } from '@nestjs/testing';
import { UtilityService } from './utility.service';

describe('UtilitiesService', () => {
  let service: UtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UtilityService ],
    }).compile();

    service = module.get<UtilityService>(UtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert a base64 string representing an object into an object', () => {
    const obj = service.convertBtoO('eyJyYXRpbmciOnRydWV9');
    expect(obj).toStrictEqual({"rating": true});
  });
});
