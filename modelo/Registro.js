class Registro{
    constructor(id,data){
        this.bandera=0;
        this.id=id;
        this.noNota=data.noNota;
        this.nombreCliente=data.nombreCliente;
        this.proveedor=data.proveedor;
        this.codigoQR=data.codigoQR;
        this.anioQR=data.anioQR;
        this.diaCompra=data.diaCompra;
        this.mesCompra=data.mesCompra;
        this.anioCompra=data.anioCompra;
        this.producto=data.producto;


        this.precio=data.precio;
        this.costo=data.costo;
        this.ganancia=data.ganancia;
    }

    set id(id){
        if(id!=null)
        id.length>0?this._id=id: this.bandera=1;
    }
    set noNota(noNota){
        noNota.length>0?this._noNota=noNota: this.bandera=1;
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
    get obtenerDatos(){
        if(this._id!=null)
            return{
                id: this.id,
                nombre: this.nombre,
                precio: this.precio,
                costo: this.costo,
                ganancia: this.ganancia
            }
        else{
            return{
                nombre: this.nombre,
                precio: this.precio,
                costo: this.costo,
                ganancia: this.ganancia
            }
        }
    }
}

module.exports=Producto;