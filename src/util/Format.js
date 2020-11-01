class Format {

    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0]; // Metodo que retorna todos as chaves// Vai procurar o primeiro ID

    }


}