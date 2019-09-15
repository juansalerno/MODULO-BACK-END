import { Vehiculo} from './claseVehiculo.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Camioneta extends Vehiculo {
    private capacidadCarga: number;

    public constructor(tipo:string, marca:string, modelo:string, patente:string, año:number, precio:number, capacidadCarga:number) {
        super(tipo, marca, modelo, patente, año, precio);
        this.capacidadCarga = capacidadCarga;
    }

    public getCapacidadCarga(): number {
        return this.capacidadCarga;
    }

}