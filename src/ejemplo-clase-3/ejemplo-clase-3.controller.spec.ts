import { Test, TestingModule } from '@nestjs/testing';
import { EjemploClase3Controller } from './ejemplo-clase-3.controller';

describe('EjemploClase3.1 Controller', () => {
  let controller: EjemploClase3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjemploClase3Controller],
    }).compile();

    controller = module.get<EjemploClase3Controller>(EjemploClase3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
