class WhatsAppController {

    constructor() {

        console.log('WhatsAppController Ok');

        this.elementsPrototype();
        this.loadElements();

    }

    loadElements() {

        this.el = {};

        console.log('1');
        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element;

        });

    }

    elementsPrototype(){

          //Tratando o escopo na função;

        Element.prototype.hide = function(){

            this.style.display = 'none';
            return this;
          }

        Element.prototype.show = function(){

            this.style.display = 'block';
            return this; // |Retornar o app para que o proximo metodo execute no elemento 

          }

        Element.prototype.toggle = function(){

            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
          }

          Element.prototype.on = function(events, fn){

            events.split(' ').forEach(event=>{

                this.addEventListener(event, fn);

            });
            return this;

          }

          Element.prototype.css = function(styles){

            for(let name in styles) {

                this.style[name] = styles[name]; 

            }
            return this;

          }

          Element.prototype.addClass = function(name){

            this.classList.add(name);
            return this;

          }

          Element.prototype.removeClass = function(name){

            this.classList.remove(name);
            return this;

          }

          Element.prototype.toggleClass = function(name){

            this.classList.toogle(name);
            return this;


          }

          Element.prototype.hasClass = function(name){

            return  this.classList.contains(name); // Se tem ou não

          }


    }

}