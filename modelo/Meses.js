class Mes{
    constructor(id,data){
        this.bandera=0;
        this.id=id;
        this.mes=data.mes;
        this.anio=data.anio;
        this.sumaPrecio=data.sumaPrecio;
        this.sumaCosto=data.sumaCosto;
        this.sumaGanancia=data.sumaGanancia;
        this.sumaSujetoA=data.sumaSujetoA;
        this.sumaSujetoB=data.sumaSujetoB;
        this.sumaSujetoC=data.sumaSujetoC;
    }

    set id(id){
        if(id!=null)
        id.length>0?this._id=id: this.bandera=1;
    }
    set mes(mes){
        mes.length>0?this._mes=mes: this.bandera=1;
    }
    set anio(anio){
        anio>-1?this._anio=anio: this.bandera=1;
    }
    set sumaPrecio(sumaPrecio){
        sumaPrecio>-1?this._sumaPrecio=sumaPrecio: this.bandera=1;
    }
    set sumaCosto(sumaCosto){
        sumaCosto>-1?this._sumaCosto=sumaCosto: this.bandera=1;
    }
    set sumaGanancia(sumaGanancia){
        sumaGanancia>-1?this._sumaGanancia=sumaGanancia: this.bandera=1;
    }
    set sumaSujetoA(sumaSujetoA){
        sumaSujetoA>-1?this._sumaSujetoA=sumaSujetoA: this.bandera=1;
    }
    set sumaSujetoB(sumaSujetoB){
        sumaSujetoB>-1?this._sumaSujetoB=sumaSujetoB: this.bandera=1;
    }
    set sumaSujetoC(sumaSujetoC){
        sumaSujetoC>-1?this._sumaSujetoC=sumaSujetoC: this.bandera=1;
    }

    get id(){
        return this._id;
    }
    get mes(){
        return this._mes;
    }
    get anio(){
        return this._anio;
    }
    get sumaPrecio(){
        return this._sumaPrecio;
    }
    get sumaCosto(){
        return this._sumaCosto;
    }
    get sumaGanancia(){
        return this._sumaGanancia;
    }
    get sumaSujetoA(){
        return this._sumaSujetoA;
    }
    get sumaSujetoB(){
        return this._sumaSujetoB;
    }
    get sumaSujetoC(){
        return this._sumaSujetoC;
    }
    get obtenerDatos(){
        if(this._id!=null)
            return{
                id: this.id,
                mes: this.mes,
                anio: this.anio,
                sumaPrecio: this.sumaPrecio,
                sumaCosto: this.sumaCosto,
                sumaGanancia: this.sumaGanancia,
                sumaSujetoA: this.sumaSujetoA,
                sumaSujetoB: this.sumaSujetoB,
                sumaSujetoC: this.sumaSujetoC
            }
        else{
            return{
                mes: this.mes,
                anio: this.anio,
                sumaPrecio: this.sumaPrecio,
                sumaCosto: this.sumaCosto,
                sumaGanancia: this.sumaGanancia,
                sumaSujetoA: this.sumaSujetoA,
                sumaSujetoB: this.sumaSujetoB,
                sumaSujetoC: this.sumaSujetoC
            }
        }
    }
}

module.exports=Mes;