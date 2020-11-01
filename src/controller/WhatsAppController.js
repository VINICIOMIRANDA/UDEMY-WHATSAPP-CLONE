class WhatsAppController {

    constructor(){

        console.log('WhatsAppController Ok');

        this.loadElements();

    }
   
    loadElements(){

        this.el = {};

        console.log('1');
        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;

        });
    }
  

}