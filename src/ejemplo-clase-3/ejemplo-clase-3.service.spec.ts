import { Test, TestingModule } from '@nestjs/testing';
import { EjemploClase3Service } from './ejemplo-clase-3.service';

describe('EjemploClase3.1Service', () => {
  let service: EjemploClase3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EjemploClase3Service],
    }).compile();

    service = module.get<EjemploClase3Service>(EjemploClase3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
