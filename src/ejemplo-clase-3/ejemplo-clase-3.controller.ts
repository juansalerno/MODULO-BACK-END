import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { EjemploClase3Service } from './ejemplo-clase-3.service';
import { Producto } from './claseProducto.service';


@Controller('ejemploClase3')
export class EjemploClase3Controller {
    constructor(private productoService: EjemploClase3Service) { }
    @Get()
    public getProductos(): Producto[] {
        return this.productoService.getProductos();
    }

    @Get(':index')
    public getProducto(@Param('index') index): Producto {
        return this.productoService.getProducto(parseInt(index));
    }

    @Post()
    create(@Body() prod: any): string {
        return this.productoService.create(prod);
    }
}
