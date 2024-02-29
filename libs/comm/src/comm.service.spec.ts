import { Test, TestingModule } from '@nestjs/testing';
import { CommService } from './comm.service';

describe('CommService', () => {
  let service: CommService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommService],
    }).compile();

    service = module.get<CommService>(CommService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
