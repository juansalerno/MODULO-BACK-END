import { Injectable } from '@nestjs/common';
import { Producto } from './claseProducto.service';
import * as fs from 'fs';
@Injectable()
export class EjemploClase3Service {
    private listaProductos: Producto[];
      public constructor() {
            this.loadProductos(); 
        } 

    public getProductos(): Producto[] {
        //this.loadProductos(); OPCION: SI NO SE PONE EN EL CONSTRUCTOR IRÍA ACÁ
        return this.listaProductos;
    }

    public getProducto(index: number): Producto {
        // Más adelante agregar manejo de status code
        if (index < 0 || index >= this.listaProductos.length)
            return null;
        return this.listaProductos[index];
    }

    public create(prod: any) {
        console.log("PRODUCTO: ");
        console.log(prod);
        console.log(typeof prod);
        console.log("----------------");
        let nombre = prod['nombreProducto'];
        let precio = prod['precio'];
        if (nombre && (parseInt(precio) > 0)) {
            const producto = new Producto(nombre, precio);
            this.listaProductos.push(prod);
            console.log(producto);
            fs.appendFileSync('./src/ejemplo-clase-3/productos.cvs',
                "\n"+
                producto.getNombreProducto() + ","
                + producto.getPrecio());
            return "ok";
        }
        else
            return "parametros incorrectos";
    }

    private loadProductos(): void {
        let archivo = fs.readFileSync('./src/ejemplo-clase-3/productos.cvs', 'utf8');
        let lineas = archivo.split('\n');
        let elementos = [];
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].replace('\r', '');
            let p = linea.split(',');
            elementos.push(p);
        }
        this.listaProductos = [];
        for (let i = 0; i < elementos.length; i++) {
            let producto = new Producto(elementos[i][0],
                parseInt(elementos[i][1]));
            this.listaProductos.push(producto);
        }
    }




}
