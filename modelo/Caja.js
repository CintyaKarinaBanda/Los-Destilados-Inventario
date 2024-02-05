class Caja{
    constructor(id,data){
        this.bandera=0;
        this.id=id;
        this.destilado=data.destilado;
        this.piezas=data.piezas;
        this.militros=data.militros;
        this.precio=data.precio;
    }

    set id(id){
        if(id!=null)
        id.length>0?this._id=id: this.bandera=1;
    }
    set destilado(destilado){
        destilado.length>0?this._destilado=destilado: this.bandera=1;
    }
    set piezas(piezas){
        piezas.length>0?this._piezas=piezas: this.bandera=1;
    }
    set militros(militros){
        militros.length>0?this._militros=militros: this.bandera=1;
    }
    set precio(precio){
        precio.length>0?this._precio=precio: this.bandera=1;
    }


    get id(){
        return this._id;
    }
    get destilado(){
        return this._destilado;
    }
    get piezas(){
        return this._piezas;
    }
    get militros(){
        return this._militros;
    }
    get precio(){
        return this._precio;
    }

    get obtenerDatos(){
        if(this._id!=null)
            return{
                id: this.id,
                destilado: this.destilado,
                piezas: this.piezas,
                militros: this.militros,
                precio: this.precio
            }
        else{
            return{
                destilado: this.destilado,
                piezas: this.piezas,
                militros: this.militros,
                precio: this.precio
            }
        }
    }
}

module.exports=Caja;