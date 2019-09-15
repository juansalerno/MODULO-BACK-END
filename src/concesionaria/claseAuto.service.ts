import { Vehiculo} from './claseVehiculo.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Auto extends Vehiculo {
    private capacidadBaul: number;

    public constructor(tipo:string, marca:string, modelo:string, patente:string, year:number, precio:number, capacidadBaul:number) {
        super(tipo, marca, modelo, patente, year, precio);
        this.capacidadBaul = capacidadBaul
    }

    public getCapacidadBaul(): number {
        return this.capacidadBaul;
    }

}