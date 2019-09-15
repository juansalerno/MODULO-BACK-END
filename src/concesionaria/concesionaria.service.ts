import { Injectable } from '@nestjs/common';
import { Vehiculo } from './claseVehiculo.service';
import { Auto } from './claseAuto.service';
import { Camioneta } from './claseCamioneta.service';
import * as fs from 'fs';

@Injectable()
export class ConcesionariaService {
    private listadoVehiculos: Vehiculo[];

    public constructor() {
        this.loadVehiculos();
    }

    public getVehiculos(): Vehiculo[] {
        return this.listadoVehiculos;
    }

    public getAutos(): Auto[] {
        let listadoAutos = [];
        for (let i = 0; i < this.listadoVehiculos.length; i++) {
            if (this.listadoVehiculos[i] instanceof Auto) {
                listadoAutos.push(this.listadoVehiculos[i])
            }
        }
        return listadoAutos;
    }

    public getCamionetas(): Camioneta[] {
        let listadoCamionetas = [];
        console.log(this.listadoVehiculos);
        for (let i = 0; i < this.listadoVehiculos.length; i++) {
            if (this.listadoVehiculos[i] instanceof Camioneta) {
                console.log(this.listadoVehiculos[i]);
                listadoCamionetas.push(this.listadoVehiculos[i])
            }
        }
        return listadoCamionetas;
    }

    public create(veh: any) {
        console.log("VEHICULO: ");
        console.log(veh);
        console.log(typeof veh);
        console.log("----------------");
        let tipo = veh['tipo'];
        let marca = veh['marca'];
        let modelo = veh['modelo'];
        let patente = veh['patente'];
        let year = veh['year'];
        let precio = veh['precio'];
        switch (tipo) {
            case 'A':
                if (marca && modelo && patente && year && precio > 0) {
                    let capBaul = veh['capacidadBaul'];
                    let auto = new Auto(tipo, marca, modelo, patente, year, precio, capBaul);
                    this.listadoVehiculos.push(auto);
                    console.log(auto);
                    fs.appendFileSync('./src/concesionaria/vehiculos.cvs',
                        '\n' + auto.getTipo() + ', ' +
                        auto.getMarca() + ', ' + auto.getModelo() + ', ' + auto.getPatente()
                        + ', ' + auto.getYear() + ', ' + auto.getPrecio() + ', ' + auto.getCapacidadBaul())
                    return 'ok';
                }
                break;
            case 'C':
                if (marca && modelo && patente && year && precio > 0) {
                    let capCarga = veh['capacidadCarga'];
                    let camioneta = new Camioneta(tipo, marca, modelo, patente, year, precio, capCarga);
                    this.listadoVehiculos.push(camioneta);
                    console.log(camioneta);
                    fs.appendFileSync('./src/concesionaria/vehiculos.cvs',
                        '\n' + camioneta.getTipo() + ', ' +
                        camioneta.getMarca() + ', ' + camioneta.getModelo() + ', ' + camioneta.getPatente()
                        + ', ' + camioneta.getYear() + ', ' + camioneta.getPrecio() + ', ' + camioneta.getCapacidadCarga())
                    return 'ok';
                }
                break;
            default: 'Tipo incorrecto';
        }
        return 'Parametros incorrectos';

    }


    private loadVehiculos() {
        let archivo = fs.readFileSync('./src/concesionaria/vehiculos.cvs', 'utf-8');
        let lineas = archivo.split('\n');
        let elementos = [];
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].replace('\r', '');
            let p = linea.split(',');
            elementos.push(p);
        }
        this.listadoVehiculos = [];
        for (let i = 0; i < elementos.length; i++) {
            if (elementos[i][0] == 'A') {
                let auto = new Auto(elementos[i][0], elementos[i][1], elementos[i][2], elementos[i][3], parseInt(elementos[i][4]), parseInt(elementos[i][5]), parseInt(elementos[i][6]));
                this.listadoVehiculos.push(auto);
            }
            if (elementos[i][0] == 'C') {
                let camioneta = new Camioneta(elementos[i][0], elementos[i][1], elementos[i][2], elementos[i][3], parseInt(elementos[i][4]), parseInt(elementos[i][5]), parseInt(elementos[i][6]));
                this.listadoVehiculos.push(camioneta);
            }
        }
    }
}
