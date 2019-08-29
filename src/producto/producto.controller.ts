import { Controller, Get } from '@nestjs/common';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
    constructor(private productoService: ProductoService) { }
    @Get()
    public getProducto(): string { //siempre poner en esta situacion que devuelve un string
        return this.productoService.getProducto()
    }
}