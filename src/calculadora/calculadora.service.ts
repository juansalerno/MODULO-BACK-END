import { Injectable, Get } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
    public getCalculo(operacionElegida: string, num1: string, num2: string): any {
        let resultado: number;
        let calculo: any;
        try {
            switch (operacionElegida) {
                case '+': resultado = parseFloat(num1) + parseFloat(num2);
                    break;
                case '-': resultado = parseFloat(num1) - parseFloat(num2);
                    break;
                case '*': resultado = parseFloat(num1) * parseFloat(num2);
                    break;
                case 'division': {
                    resultado = parseFloat(num1) / parseFloat(num2);
                    operacionElegida = '/'; // se cambia a los efectos de exponerlo mejor
                }
                    break;
                case '^': resultado = parseFloat(num1) ** parseFloat(num2);
                    break;
                default: throw new Error('Ingrese una operacion permitida (+,-,*,%,^)')
            }
            calculo = {
                "num1": num1,
                "operacionElegida": operacionElegida,
                "num2": num2,
                "resultado": resultado
            }
        }
        catch (error) {
            alert(error.message);
        }
        return calculo;
    }
}
