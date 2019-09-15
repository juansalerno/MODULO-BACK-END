import { Test, TestingModule } from '@nestjs/testing';
import { ConcesionariaService } from './concesionaria.service';

describe('ConcesionariaService', () => {
  let service: ConcesionariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcesionariaService],
    }).compile();

    service = module.get<ConcesionariaService>(ConcesionariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
