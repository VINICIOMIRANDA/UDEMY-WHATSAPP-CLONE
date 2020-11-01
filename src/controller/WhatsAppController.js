class WhatsAppController {

    constructor() {

        console.log('WhatsAppController Ok');

        this.elementsPrototype();
        this.loadElements();
        this.initEvents(); // Metodo vai iniciar todos os eventos

    }

    loadElements() {

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element;

        });

    }

    elementsPrototype() {

        //Tratando o escopo na função;

        Element.prototype.hide = function () {

            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function () {

            this.style.display = 'block';
            return this; // |Retornar o app para que o proximo metodo execute no elemento 

        }

        Element.prototype.toggle = function () {

            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        Element.prototype.on = function (events, fn) {

            events.split(' ').forEach(event => {

                this.addEventListener(event, fn);

            });
            return this;

        }

        Element.prototype.css = function (styles) {

            for (let name in styles) {

                this.style[name] = styles[name];

            }
            return this;

        }

        Element.prototype.addClass = function (name) {

            this.classList.add(name);
            return this;

        }

        Element.prototype.removeClass = function (name) {

            this.classList.remove(name);
            return this;

        }

        Element.prototype.toggleClass = function (name) {

            this.classList.toggle(name);
            return this;


        }

        Element.prototype.hasClass = function (name) {

            return this.classList.contains(name); // Contains "Se tem ou não"

        }

        HTMLFormElement.prototype.getForm = function () { //Aula 116

            return new FormData(this);

        }

        HTMLFormElement.prototype.toJSON = function () { //Aula 116 

            let json = {};

            this.getForm().forEach((value, key) => {

                json[key] = value

            });


            return json; // Gerar o formulario preenchido no formato JSON

        }


    }

    initEvents() {

        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanel(); //Fechando o panel
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);

        });

        this.el.btnNewContact.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);

        });

        this.el.btnClosePanelEditProfile.on('click', e => {

            this.el.panelEditProfile.removeClass('open');

        });

        this.el.btnClosePanelAddContact.on('click', e => {

            this.el.panelAddContact.removeClass('open');


        });

        this.el.photoContainerEditProfile.on('click', e => {

            this.el.inputProfilePhoto.click();

        });

        this.el.inputNamePanelEditProfile.on('keypress', e => { // keypress 

            if (e.key === 'Enter') {

                e.preventDefault(); //Não atualizar
                this.el.btnSavePanelEditProfile.click();
            }

        });

        this.el.btnSavePanelEditProfile.on('click', e => {

            console.log(this.el.inputNamePanelEditProfile.innerHTML);


        });

        this.el.formPanelAddContact.on('submit', e => {

            e.preventDefault(); //Não atualizar

            let formData = new FormData(this.el.formPanelAddContact); //Colocando o ID do elmento no construtor do FormData.


        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {   // Classe contact-item

            item.on('click', e => {


                this.el.home.hide(); // Ocultando o id home
                this.el.main.css({
                    display: 'flex'


                });

            });

            this.el.btnAttach.on('click', e => {  //Clicando no icone de anexo

                e.stopPropagation(); // Executando um evento  apenas na camada selecionado , evitando que execute nas os elementos ancestrais.
                this.el.menuAttach.addClass('open'); //Mostra o menu do anexo
                document.addEventListener('click', this.closeMenuAttach.bind(this));
                // .bind(this) é usado para vincular o escopo do this com outro escopo
            });

            this.el.btnAttachPhoto.on('click', e => {
                this.el.inputPhoto.click();
            });

            this.el.inputPhoto.on('change', e => {

                console.log(this.el.inputPhoto.files); // files é um coleção

                [...this.el.inputPhoto].forEach(file => {  // transformando a coleção em Array para usar o forEach

                    console.log(file);
                });

            });

            this.el.btnAttachCamera.on('click', e => {

                this.closeAllMainPanel();                 // Escondendo a tela de mensagem para mostrar a tela de foto
                this.el.panelCamera.addClass('open');
                this.el.panelCamera.css({
                    'height': 'calc(100% - 120px)'

                });

                this.el.btnClosePanelCamera.on('click', e => {

                    this.closeAllMainPanel();
                    this.el.panelMessagesContainer.show();// Mostrando  a tela de mensagem e fechando  a tela de foto

                });

                this.el.btnTakePicture.on('click', e => {

                    console.log('take picture')

                });

            });

            this.el.btnAttachDocument.on('click', e => {
                this.closeAllMainPanel();
                this.el.panelDocumentPreview.addClass('open');
                this.el.panelDocumentPreview.css({
                    'height': 'calc(100% - 120px)'

                });

            });

            this.el.btnClosePanelDocumentPreview.on('click', e => {
                this.closeAllMainPanel();
                this.el.panelMessagesContainer.show();

            });

            this.el.btnSendDocument.on('click', e => {

                console.log('Enviando o Documento');

            })

            this.el.btnAttachContact.on('click', e => {
                this.el.modalContacts.show();

            });

            this.el.btnCloseModalContacts.on('click', e => {

                this.el.modalContacts.hide();

            })

        });

        this.el.btnSendMicrophone.on('click', e => {

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTime();

        });


        this.el.btnCancelMicrophone.on('click', e => {

            this.closeRecordMicrophone();

        });

        this.el.btnFinishMicrophone.on('click', e => {

            this.closeRecordMicrophone();

        });


        this.el.inputText.on('keypress', e => {

            if (e.key === 'Enter' && !e.ctrlKey) {

                e.preventDefault();
                this.el.btnSend.click()
            }

        })

        this.el.inputText.on('keyup', e => {

            if (this.el.inputText.innerHTML.length) {

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

                // Escondendo: Place holder e Microfone
                // Mostrando: Botão de enviar.

            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();

                // Mostrando: Place holder e Microfone
                // Escondendo: Botão de enviar.
            }

        });

        this.el.btnSend.on('click', e => { //Botão Enviar (Caixa de mensagem)

            console.log(this.el.inputText.innerHTML);
        });

        this.el.btnEmojis.on('click', e => {

            this.el.panelEmojis.toggleClass('open'); // Altena ao clicar no icone do emojis.

        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {

            emoji.on('click', e => {

                //  console.log(emoji.dataset.unicode);

                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name => {

                    img.classList.add(name);

                });

              //  this.el.inputText.appendChild(img);

                let cursor = window.getSelection();

                if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') { // Vai verificar se o curso está no input da caixa de mensagem.

                    this.el.inputText.focus();
                    cursor = window.getSelection();

                }


                let range = document.createRange();

                range = cursor.getRangeAt(0);
                range.deleteContents(); // Vai apagar o range de caracteres


                let frag = document.createDocumentFragment();

                frag.appendChild(img);

                range.insertNode(frag); // Inserindo o emoji na posição escolhida na caixa de mensagem.

                range.setStartAfter(img); //




                this.el.inputText.dispatchEvent(new Event('keyup'));
            });

        });


    }





    startRecordMicrophoneTime() {

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start); //Usando a classe toTime do Format.js

        }, 100);



    }


    closeRecordMicrophone() {

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval); //Parando o timer


    }

    closeAllMainPanel() {

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');  //Fechando a tela de foto
    }

    closeMenuAttach(e) {

        document.removeEventListener('click', this.closeMenuAttach);  //removendo o evento 
        this.el.menuAttach.removeClass('open'); // Esconde o menu anexar quando clicado em qualquer elemento na pagina

    }


    closeAllLeftPanel() {

        this.el.panelAddContact.hide();

        this.el.panelEditProfile.hide();

    }

}

