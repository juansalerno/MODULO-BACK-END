import { Controller, Param, Get } from '@nestjs/common';
import { CalculadoraService } from './calculadora.service';

@Controller('calcular')
export class CalculadoraController {
    constructor(private calculadoraService: CalculadoraService){}

    @Get(':arg1/:arg2/:arg3')
    public getCalculo(@Param('arg1') opElegida, @Param('arg2') numero1, @Param('arg3') numero2): string {
        return this.calculadoraService.getCalculo(opElegida, numero1, numero2);
    }
}
