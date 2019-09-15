import { Test, TestingModule } from '@nestjs/testing';
import { ConcesionariaController } from './concesionaria.controller';

describe('Concesionaria Controller', () => {
  let controller: ConcesionariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcesionariaController],
    }).compile();

    controller = module.get<ConcesionariaController>(ConcesionariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
