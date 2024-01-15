class Gasto{
    constructor(id,data){
        this.bandera=0;
        this.id=id;
        this.concepto=data.concepto;
        this.cantidad=data.cantidad;
        this.mesGasto=data.mesGasto;
        this.anioGasto=data.anioGasto;

        this.fechaRegistro = data.fechaRegistro;
    }

    set id(id){
        if(id!=null)
        id.length>0?this._id=id: this.bandera=1;
    }
    set concepto(concepto){
        concepto.length>0?this._concepto=concepto: this.bandera=1;
    }
    set cantidad(cantidad){
        cantidad.length>0?this._cantidad=cantidad: this.bandera=1;
    }
    set mesGasto(mesGasto){
        mesGasto.length>0?this._mesGasto=mesGasto: this.bandera=1;
    }
    set anioGasto(anioGasto){
        anioGasto.length>0?this._anioGasto=anioGasto: this.bandera=1;
    }


    get id(){
        return this._id;
    }
    get concepto(){
        return this._concepto;
    }
    get cantidad(){
        return this._cantidad;
    }
    get mesGasto(){
        return this._mesGasto;
    }
    get anioGasto(){
        return this._anioGasto;
    }

    get obtenerDatos(){
        if(this._id!=null)
            return{
                id: this.id,
                concepto: this.concepto,
                cantidad: this.cantidad,
                mesGasto: this.mesGasto,
                anioGasto: this.anioGasto,

                fechaRegistro: this.fechaRegistro
            }
        else{
            return{
                concepto: this.concepto,
                cantidad: this.cantidad,
                mesGasto: this.mesGasto,
                anioGasto: this.anioGasto,

                fechaRegistro: this.fechaRegistro
            }
        }
    }
}

module.exports=Gasto;