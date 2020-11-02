export class ClassEvent {

    constructor() {

        this._events = {};

    }


    on(eventName, fn) {

        if (!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(fn); //Adiciondo a função no evento
    }



    trigger() {

        let args = [...arguments];  // Nativo do JS para pegar os argumentos
        let eventName = args.shift() //Remove o primeiro elemento do Array

        args.push(new Event(eventName)); // 

        if (this._events[eventName] instanceof Array) { // instanceof verificar se é um Array

            this._events[eventName].forEach(fn => {

                fn.apply(null, args);


            });

        }

    }
}