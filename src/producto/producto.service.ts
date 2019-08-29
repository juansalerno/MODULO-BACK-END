import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()

export class ProductoService {
    /* ---------> OPCION 1 : ALEATORIA
    private static readonly CANTIDAD_PRODUCTOS = 10;
    public getProducto(): any { // se pone any para que tome cualquier cosa
        let productos = [];
        for (let i = 0; i < ProductoService.CANTIDAD_PRODUCTOS; i++) {
            let precio = Math.floor(Math.random() * 100)
            let producto = {
                'producto_nombre': 'producto_' + i,
                'descripcion': Math.floor(Math.random() * 100000000),
                'precio': precio,
                'IVA_21': precio*0.21
            };
            productos.push(producto);
        }
        return productos;
    }
    */
    /* ---------> OPCION 2 : ARREGLO EN MEMORIA CREADO EN EL CODIGO:
    public getProducto(): any {
        let productos = [
            {
                'producto_nombre': 'Revista Caras',
                'descripcion': 'Edicion 24/08/2019',
                'precio': 65,
                'IVA_21': 65 * 0.21
            },

            {
                'producto_nombre': 'Revista Viva',
                'descripcion': 'Edicion 22/08/2019',
                'precio': 73,
                'IVA_21': 73 * 0.21
            },

            {
                'producto_nombre': 'Diario El Eco',
                'descripcion': 'Edicion 23/08/2019',
                'precio': 52,
                'IVA_21': 52 * 0.21
            }
        ]
        return productos;
    }
    */
 // ---------> OPCION 3 : ARREGLO EN MEMORIA IMPORTADO DE TXT:
    public getProducto(): any {
        let productos = [];
        let textoImportado: string = fs.readFileSync('./src/producto/productos.txt', 'utf8');
        let arregloRows: string[] = textoImportado.split('\r\n');
        for (let i = 0; i < arregloRows.length; i++) {
            let itemsProd = arregloRows[i].split(',');
            let prod = {
                "producto_nombre":itemsProd[0],
                "descripcion":itemsProd[1],
                "precio": parseInt(itemsProd[2]),
                "IVA_21": parseFloat(itemsProd[3])
            }
            productos.push(prod);
        }
        return productos;
    }
}