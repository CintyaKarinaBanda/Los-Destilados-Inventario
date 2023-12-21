class Producto{
    constructor(id,data){
        this.bandera=0;
        this.id=id;
        this.nombre=data.nombre;
        this.precio=data.precio;
        this.costo=data.costo;
        this.ganancia=data.ganancia;
        this.sujetoA=data.sujetoA;
        this.sujetoB=data.sujetoB;
        this.sujetoC=data.sujetoC;
    }

    set id(id){
        if(id!=null)
        id.length>0?this._id=id: this.bandera=1;
    }
    set nombre(nombre){
        nombre.length>0?this._nombre=nombre: this.bandera=1;
    }
    set precio(precio){
        precio.length>0?this._precio=precio: this.bandera=1;
    }
    set costo(costo){
        costo.length>0?this._costo=costo: this.bandera=1;
    }
    set ganancia(ganancia){
        ganancia.length>0?this._ganancia=ganancia: this.bandera=1;
    }
    set sujetoA(sujetoA){
        sujetoA.length>0?this._sujetoA=sujetoA: this.bandera=1;
    }
    set sujetoB(sujetoB){
        sujetoB.length>0?this._sujetoB=sujetoB: this.bandera=1;
    }
    set sujetoC(sujetoC){
        sujetoC.length>0?this._sujetoC=sujetoC: this.bandera=1;
    }

    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get precio(){
        return this._precio;
    }
    get costo(){
        return this._costo;
    }
    get ganancia(){
        return this._ganancia;
    }
    get sujetoA(){
        return this._sujetoA;
    }
    get sujetoB(){
        return this._sujetoB;
    }
    get sujetoC(){
        return this._sujetoC;
    }
    get obtenerDatos(){
        if(this._id!=null)
            return{
                id: this.id,
                nombre: this.nombre,
                precio: this.precio,
                costo: this.costo,
                ganancia: this.ganancia,
                sujetoA: this.sujetoA,
                sujetoB: this.sujetoB,
                sujetoC: this.sujetoC
            }
        else{
            return{
                nombre: this.nombre,
                precio: this.precio,
                costo: this.costo,
                ganancia: this.ganancia,
                sujetoA: this.sujetoA,
                sujetoB: this.sujetoB,
                sujetoC: this.sujetoC
            }
        }
    }
}

module.exports=Producto;