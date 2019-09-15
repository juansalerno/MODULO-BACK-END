import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConcesionariaService } from './concesionaria.service';
import { Vehiculo } from './claseVehiculo.service';
import { Auto } from './claseAuto.service';
import { Camioneta } from './claseCamioneta.service';

@Controller('concesionaria')
export class ConcesionariaController {
    public constructor (private concesionariaService: ConcesionariaService) {}

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

    @Post()
    public create(@Body() veh: any):string {
        return this.concesionariaService.create(veh);
    }
}
