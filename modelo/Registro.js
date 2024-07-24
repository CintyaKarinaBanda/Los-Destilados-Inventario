class Registro{
    constructor(id,data){
        this.bandera=0;
        this.id=id;
        this.noNota=data.noNota;
        this.nombreCliente=data.nombreCliente;
        this.diaCompra=data.diaCompra;
        this.mesCompra=data.mesCompra;
        this.anioCompra=data.anioCompra;
        this.proveedor=data.proveedor;
        this.producto=data.producto;
        this.anioQR=data.anioQR;
        this.codigoQR=data.codigoQR;
        
        this.precio=data.precio;
        this.costo=data.costo;
        this.ganancia=data.ganancia;
        this.sujetoA=data.sujetoA;
        this.sujetoB=data.sujetoB;
        this.sujetoC=data.sujetoC;

        this.fechaRegistro = data.fechaRegistro;
    }

    set id(id){
        if(id!=null)
        id.length>0?this._id=id: this.bandera=1;
    }
    set noNota(noNota){
        noNota.length>0?this._noNota=noNota: this.bandera=1;
    }
    set nombreCliente(nombreCliente){
        nombreCliente.length>0?this._nombreCliente=nombreCliente: this.bandera=1;
    }
    set diaCompra(diaCompra){
        diaCompra.length>0?this._diaCompra=diaCompra: this.bandera=1;
    }
    set mesCompra(mesCompra){
        mesCompra.length>0?this._mesCompra=mesCompra: this.bandera=1;
    }
    set anioCompra(anioCompra){
        anioCompra.length>0?this._anioCompra=anioCompra: this.bandera=1;
    }
    set proveedor(proveedor){
        proveedor.length>0?this._proveedor=proveedor: this.bandera=1;
    }
    set producto(producto){
        producto.length>0?this._producto=producto: this.bandera=1;
    }
    set anioQR(anioQR){
        this._anioQR=anioQR || '';
    }
    set codigoQR(codigoQR){
        this._codigoQR=codigoQR || '';
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
    get noNota(){
        return this._noNota;
    }
    get nombreCliente(){
        return this._nombreCliente;
    }
    get diaCompra(){
        return this._diaCompra;
    }
    get mesCompra(){
        return this._mesCompra;
    }
    get anioCompra(){
        return this._anioCompra;
    }
    get proveedor(){
        return this._proveedor;
    }
    get producto(){
        return this._producto;
    }
    get anioQR(){
        return this._anioQR;
    }
    get codigoQR(){
        return this._codigoQR;
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
                noNota: this.noNota,
                nombreCliente: this.nombreCliente,
                diaCompra: this.diaCompra,
                mesCompra: this.mesCompra,
                anioCompra: this.anioCompra,
                proveedor: this.proveedor,
                producto: this.producto,
                anioQR: this.anioQR,
                codigoQR: this.codigoQR,

                precio: this.precio,
                costo: this.costo,
                ganancia: this.ganancia,
                sujetoA: this.sujetoA,
                sujetoB: this.sujetoB,
                sujetoC: this.sujetoC,

                fechaRegistro: this.fechaRegistro
            }
        else{
            return{
                noNota: this.noNota,
                nombreCliente: this.nombreCliente,
                diaCompra: this.diaCompra,
                mesCompra: this.mesCompra,
                anioCompra: this.anioCompra,
                proveedor: this.proveedor,
                producto: this.producto,
                anioQR: this.anioQR,
                codigoQR: this.codigoQR,

                precio: this.precio,
                costo: this.costo,
                ganancia: this.ganancia,
                sujetoA: this.sujetoA,
                sujetoB: this.sujetoB,
                sujetoC: this.sujetoC,

                fechaRegistro: this.fechaRegistro
            }
        }
    }
}

module.exports=Registro;