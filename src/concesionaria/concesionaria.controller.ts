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

    @Get('autos')
    public getAutos(): Auto[] {
        return this.concesionariaService.getAutos();
    }

    @Get('camionetas')
    public getCamionetas(): Camioneta[] {
        return this.concesionariaService.getCamionetas();
    }

    @Get('pos/:index')
    public getPorPosicion(@Param('index') pos): any {
        return this.concesionariaService.getPorPosicion(parseInt(pos));
    }

    @Get('select/:dominio')
    public getPorDominio(@Param('dominio') dom): any {
        return this.concesionariaService.getPorDominio(dom);
    }


    @Post()
    public create(@Body() veh: any): string {
        return this.concesionariaService.create(veh);
    }

    @Delete(':id')
    public deletePorPosicion(@Param('id') pos): string {
        return this.concesionariaService.deletePorPosicion(parseInt(pos));
    }

    @Put(':id')
    public updatePorPosicion(@Param('id') pos, @Body() veh: any): string {
        return this.concesionariaService.updatePorPosicion(parseInt(pos), veh);
    }
}