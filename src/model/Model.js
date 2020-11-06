import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent{

    constructor(){

        super();
        this._data = {};

    }

    fromJSON(json){

        this._data = Object.assign(this._data, json); // MERGE
        this.trigger('datachange', this.toJSON()); //Metodo usado para qualquer um possa ouvir o evento


    }

    toJSON(){

        return this._data;
    }
}