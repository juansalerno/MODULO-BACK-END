import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ConcesionariaService } from './concesionaria.service';
import { Vehiculo } from './claseVehiculo.service';
import { Auto } from './claseAuto.service';
import { Camioneta } from './claseCamioneta.service';

@Controller('concesionaria')
export class ConcesionariaController {
    public constructor(private concesionariaService: ConcesionariaService) { }

    @Get()
    public getVehiculos(): Vehiculo[] {
        return this.concesionariaService.getVehiculos();
    }

    @Get('/listar/autos')
    public getAutos(): Auto[] {
        return this.concesionariaService.getAutos();
    }

    @Get('/listar/camionetas')
    public getCamionetas(): Camioneta[] {
        return this.concesionariaService.getCamionetas();
    }

    /*@Get(':id')
    public getPorPosicion(@Param('id') pos) {
    return this.concesionariaService.getPorPosicion(parseInt(pos));
    }
*/
    @Post()
    public create(@Body() veh: any): string {
        return this.concesionariaService.create(veh);
    }

    @Delete(':id')
    public deletePorPosicion(@Param('id') pos): string {
        return this.concesionariaService.deletePorPosicion(parseInt(pos));
    }
}