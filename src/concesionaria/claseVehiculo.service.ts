export abstract class Vehiculo {
    private tipo: string;
    private marca: string;
    private modelo: string;
    private patente: string;
    private year: number;
    private precio: number;

    public constructor(tipo: string, marca:string, modelo:string, patente:string, year:number, precio:number) {
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.patente = patente;
        this.year = year;
        this.precio = precio;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getMarca(): string {
        return this.marca;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public getPatente(): string {
        return this.patente;
    }

    public getYear(): number {
        return this.year;        
    }
    public getPrecio(): number {
        return this.precio;
    }
}