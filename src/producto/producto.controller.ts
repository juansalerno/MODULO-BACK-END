import { Controller, Get, Param } from '@nestjs/common';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
    constructor(private productoService: ProductoService) { }
    @Get()
    public getProductos(): string { //siempre poner en esta situacion que devuelve un string
        return this.productoService.getProductos()
    }

    @Get(':arg1/:arg2/:arg3/:arg4')
    public getProducto(@Param('arg1') pos1, @Param('arg2') pos2, @Param('arg3') pos3, @Param('arg4') pos4) : string {
        return this.productoService.getProducto(pos1, pos2, pos3, pos4)
    }
}