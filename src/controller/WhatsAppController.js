import { Format } from './../util/Format';
import { CameraController } from './../controller/CameraController';
import { MicrophoneController } from './../controller/MicrophoneController';
import { DocumentPreviewController } from './../controller/DocumentPreviewController';
import { Firebase } from './../util/Firebase';
import { User } from '../model/User';
import { Chat } from '../model/Chat';
import { Message } from '../model/Message';
import { Base64 } from '../util/Base64';
import { ContactsController } from '../controller/ContactsController';

export class WhatsAppController {

  constructor() {

    console.log('WhatsAppController Ok');

    this._firebase = new Firebase(); // Corrigindo Uncaught TypeError: Cannot read property 'initAuth' of undefined, alterado a ordem do initAuth após o firebase.
    this.initAuth();
    this.elementsPrototype();
    this.loadElements();
    this.initEvents(); // Metodo vai iniciar todos os eventos



  }

  initAuth() {

    this._firebase.initAuth().then(response => {


      this._user = new User(response.user.email);

      this._user.on('datachange', data => {

        document.querySelector('title').innerHTML = data.name + ' - WathsApp Clone';


        this.el.inputNamePanelEditProfile.innerHTML = data.name; // Por ser uma div, utilizamos o innerHTML

        if (data.photo) {

          let photo = this.el.imgPanelEditProfile;
          photo.src = data.photo;
          photo.show();

          this.el.imgDefaultPanelEditProfile.hide();
          let photo2 = this.el.myPhoto.querySelector('img');
          photo2.src = data.photo;
          photo2.show();



        }

        this.initContacts();





      });

      this._user.name = response.user.displayName;
      this._user.email = response.user.email;
      this._user.photo = response.user.photoURL;

      this._user.save().then(() => {

        this.el.appContent.css({

          display: 'flex'

        });

      })

        .catch(err => {

          console.error(err);

        })

      //   this._user = response.user;

      let userRef = User.findByEmail(response.user.email);




    }).catch(err => {

      console.error(err);
    });

  }

  initContacts() {


    this._user.on('contactschange', docs => {

      this.el.contactsMessagesList.innerHTML = '';

      docs.forEach(doc => {

        let contact = doc.data();

        let div = document.createElement('div');

        div.className = 'contact-item';

        div.innerHTML = `
                        <div class="dIyEr">
                            <div class="_1WliW" style="height: 49px; width: 49px;">
                                <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                                <div class="_3ZW2E">
                                    <span data-icon="default-user" class="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                            <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                                            </path>
                                            <g fill="#FFF">
                                                <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                                                </path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="_3j7s9">
                            <div class="_2FBdJ">
                                <div class="_25Ooe">
                                    <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                                </div>
                                <div class="_3Bxar">
                                    <span class="_3T2VG">${contact.lastMessageTime}</span>
                                </div>
                            </div>
                            <div class="_1AwDx">
                                <div class="_itDl">
                                    <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>
        
                                    <span class="_2_LEW last-message">
                                        <div class="_1VfKB">
                                            <span data-icon="status-dblcheck" class="">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                                    <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                                        <div class="_3Bxar">
                                            <span>
                                                <div class="_15G96">
                                                    <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                                </div>
                                        </span></div>
                                    </span>
                                </div>
                            </div>
                        </div>
           `;

        if (contact.photo) {

          let img = div.querySelector('.photo');
          img.src = contact.photo;
          img.show();

        }

        div.on('click', e => {

          console.log('chatID', contact.chatId);

          this.setActiveChat(contact);

        });

        this.el.contactsMessagesList.appendChild(div);


      })

    })
    this._user.getContacts()

  }


  setActiveChat(contact) {

    if (this._contactActive) {// Verificando se contact existir, jogar vazio  

      Message.getRef(this._contactActive.chatId).onSnapshot(() => { });

    }
    this._contactActive = contact;

    this.el.activeName.innerHTML = contact.name;
    this.el.activeStatus.innerHTML = contact.status;

    if (contact.photo) {

      let img = this.el.activePhoto;
      img.src = contact.photo;
      img.show();
    }

    this.el.home.hide();
    this.el.main.css({

      display: 'flex'

    });

    this.el.panelMessagesContainer.innerHTML = '';


    Message.getRef(this._contactActive.chatId).orderBy('timeStamp')
      .onSnapshot(docs => {

        let scrollTop = this.el.panelMessagesContainer.scrollTop;
        let scrollTopMax = (this.el.panelMessagesContainer.scrollHeight - this.el.panelMessagesContainer.offsetHeight);
        let autoScroll = (scrollTop >= scrollTopMax);

        docs.forEach(doc => {

          let data = doc.data();
          data.id = doc.id;

          let message = new Message();

          message.fromJSON(data);

          let me = (data.from === this._user.email);

          let view = message.getViewElement(me);

          if (!this.el.panelMessagesContainer.querySelector('#_' + data.id)) { // O nome de seletores  ID não pode começar com o número por isso #_

            if (!me) {

              doc.ref.set({
                status: 'read'
              }, {
                merge: true
              })

            }

            this.el.panelMessagesContainer.appendChild(view);

          } else {

            let parent = this.el.panelMessagesContainer.querySelector('#_' + data.id).parentNode;

            parent.replaceChild(view, this.el.panelMessagesContainer.querySelector('#_' + data.id));


          }

          if (this.el.panelMessagesContainer.querySelector('#_' + data.id) && me) {

            let msgEl = this.el.panelMessagesContainer.querySelector('#_' + data.id);
            msgEl.querySelector('.message-status').innerHTML = message.getStatusViewElement().outerHTML;
            console.log(msgEl.querySelectorAll('.message-time'))
          }

          if (message.type === 'contact') {

            view.querySelector('.btn-message-send').on('click', e => {

              Chat.createIfNotExists(this._user.email, message.content.email).then(chat => {

                let contact = new User(message.content.email);
                contact.on('datachange', data => {

                  contact.chatId = chat.id;

                  this._user.addContact(contact);

                  this._user.chatId = chat.id;

                  contact.addContact(this._user);

                  this.setActiveChat(contact);
                });


              });

            });

          }


        });

        if (autoScroll) {

          this.el.panelMessagesContainer.scrollTop = (this.el.panelMessagesContainer.scrollHeight - this.el.panelMessagesContainer.offsetHeight);

        } else {

          this.el.panelMessagesContainer.scrollTop = scrollTop;
        }

      });






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

    this.el.inputSearchContacts.on('keyup', e => {

      if (this.el.inputSearchContacts.value.length > 0) {
        this.el.inputSearchContactsPlaceholder.hide();

      } else {

        this.el.inputSearchContactsPlaceholder.show();

      }

      this._user.getContacts(this.el.inputSearchContacts.value);

    });

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

      this.el.btnSavePanelEditProfile.disabled = true;

      this._user.name = this.el.inputNamePanelEditProfile.innerHTML;


      console.log(this.el.inputNamePanelEditProfile.innerHTML);

      this._user.save().then(() => {

        this.el.btnSavePanelEditProfile.disabled = false;

      });


    });

    this.el.formPanelAddContact.on('submit', e => {

      e.preventDefault(); //Não atualizar

      let formData = new FormData(this.el.formPanelAddContact); //Colocando o ID do elmento no construtor do FormData.


      let contact = new User(formData.get('email'));

      contact.on('datachange', data => {

        if (data.name) {

          Chat.createIfNotExists(this._user.email, contact.email).then(chat => {

            contact.chatId = chat.id;

            this._user.chatId = chat.id;

            contact.addContact(this._user);

            this._user.addContact(contact).then(() => {

              this.el.btnClosePanelAddContact.click();
              console.info('Contato foi adicionado');


            });

          });

        } else {

          console.error('Usuário não foi encontrado.')
        }


      });


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
        //    console.log(this.el.inputPhoto.files); // files é um coleção
        [...this.el.inputPhoto.files].forEach(file => {
          // transformando a coleção em Array para usar o forEach
          //        console.log(file);
          Message.sendImage(this._contactActive.chatId, this._user.email, file);
        });

      });

      this.el.btnAttachCamera.on('click', e => {

        this.closeAllMainPanel();                 // Escondendo a tela de mensagem para mostrar a tela de foto
        this.el.panelCamera.addClass('open');
        this.el.panelCamera.css({
          'height': 'calc(100% - 120px)'

        });

        this._camera = new CameraController(this.el.videoCamera);

      });

      this.el.btnClosePanelCamera.on('click', e => {

        this.closeAllMainPanel();
        this.el.panelMessagesContainer.show();// Mostrando  a tela de mensagem e fechando  a tela de foto
        this._camera.stop();

      });

      this.el.btnTakePicture.on('click', e => {

        let dataURL = this._camera.takePicture();

        this.el.pictureCamera.src = dataURL;
        this.el.pictureCamera.show();
        this.el.videoCamera.hide(); // Esconder a camera 
        this.el.btnReshootPanelCamera.show(); // Tirar novamente
        this.el.containerTakePicture.hide(); //Esconder o botão da camera.
        this.el.containerSendPicture.show();

      });

      this.el.btnReshootPanelCamera.on('click', e => {

        this.el.pictureCamera.hide();
        this.el.videoCamera.show(); // Esconder a camera 
        this.el.btnReshootPanelCamera.hide(); // Tirar novamente
        this.el.containerTakePicture.show(); //Esconder o botão da camera.
        this.el.containerSendPicture.hide();



      })

      this.el.btnSendPicture.on('click', e => {

        this.el.btnSendPicture.disabled = true;

        console.log(this.el.pictureCamera.src);

        let regex = /^data:(.+);base64,(.*)$/;
        let result = this.el.pictureCamera.src.match(regex);
        let mimeType = result[1];
        let ext = mimeType.split('/')[1];
        let filename = `camera${Date.now()}.${ext}`;

        let picture = new Image();
        picture.src = this.el.pictureCamera.src;
        picture.onload = e => {


          //Rotacionando a camera
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');

          canvas.width = picture.width;
          canvas.height = picture.height;

          context.translate(picture.width, 0);
          context.scale(-1, 1);

          context.drawImage(picture, 0, 0, canvas.width, canvas.height);

          fetch(canvas.toDataURL(mimeType))
            .then(res => { return res.arrayBuffer(); })
            .then(buffer => { return new File([buffer], filename, { type: mimeType }); })
            .then(file => {

              Message.sendImage(this._contactActive.chatId, this._user.email, file);

              this.el.btnSendPicture.disabled = false;

              this.closeAllMainPanel();
              this._camera.stop();
              this.el.btnReshootPanelCamera.hide();
              this.el.pictureCamera.hide();
              this.el.videoCamera.show();
              this.el.containerSendPicture.hide();
              this.el.containerTakePicture.show();
              this.el.panelMessagesContainer.show();

            });

        }



        console.log(result);


      });


      this.el.btnAttachDocument.on('click', e => {

        this.closeAllMainPanel();
        this.el.panelDocumentPreview.addClass('open');
        this.el.panelDocumentPreview.css({
          'height': 'calc(100% - 120px)'

        });

        this.el.inputDocument.click();

      });

      this.el.inputDocument.on('change', e => {

        if (this.el.inputDocument.files.length) {

          this.el.panelDocumentPreview.css({
            'height': '1%'

          });


          let file = this.el.inputDocument.files[0];

          this._documentPreviewController = new DocumentPreviewController(file);

          this._documentPreviewController.getPreviewData().then(result => {

            this.el.imgPanelDocumentPreview.src = result.src;
            this.el.infoPanelDocumentPreview.innerHTML = result.info;
            this.el.imagePanelDocumentPreview.show();
            this.el.filePanelDocumentPreview.hide();

            this.el.panelDocumentPreview.css({
              'height': 'calc(100% - 120px)'

            });




          }).catch(err => {

            //   console.log('err', err);

            this.el.panelDocumentPreview.css({
              'height': 'calc(100% - 120px)'

            });


            console.log(file.type)

            switch (file.type) {

              case 'application/vnd.ms-excel':
              case 'application/vnd.openxmlformatts-officedocument.spreadsheetml.sheet':
                this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';

                break;

              case 'application/vnd.ms-powerpoint':
              case 'application/vnd.openxmlformatts-officedocument.presemtationml.presentation':
                this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';

                break;

              case 'application/msword':
              case 'application/vnd.openxmlformatts-officedocument.wordprocessingml.document':
                this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';

                break;

              default:
                this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';

                break;


            }

            this.el.filenamePanelDocumentPreview.innerHTML = file.name;
            this.el.imagePanelDocumentPreview.hide();
            this.el.filePanelDocumentPreview.show();

          });
        }
      })


      this.el.btnClosePanelDocumentPreview.on('click', e => {
        this.closeAllMainPanel();
        this.el.panelMessagesContainer.show();

      });

      this.el.btnSendDocument.on('click', e => {

        let file = this.el.inputDocument.files[0];
        let base64 = this.el.imgPanelDocumentPreview.src;
        console.log("FILE", file)


        if (file.type === 'application/pdf') {


          Base64.toFile(base64).then(filePreview => {

            console.log("ENVIANDO O ARQUIVO")
            Message.sendDocument(
              this._contactActive.chatId,
              this._user.email, file, filePreview, this.el.infoPanelDocumentPreview.innerHTML);

          });

        } else {

          Message.sendDocument(
            this._contactActive.chatId,
            this._user.email, file);


        }

        this.el.btnClosePanelDocumentPreview.click();


      })

      this.el.btnAttachContact.on('click', e => {


        this._contactsController = new ContactsController(this.el.modalContacts, this._user);
        this._contactsController.on('select', contact => {

          Message.sendContact(this._contactActive.chatId, this._user.email, contact)

        });

        this._contactsController.open()

      });

      this.el.btnCloseModalContacts.on('click', e => {

        this._contactsController.close();


      })

    });

    this.el.btnSendMicrophone.on('click', e => {

      this.el.recordMicrophone.show();
      this.el.btnSendMicrophone.hide();

      this._microphoneController = new MicrophoneController();


      this._microphoneController.on('ready', audio => {

        console.log('ready event');

        this._microphoneController.startRecorder();

        //   console.log('Recebi o evento play', audio);

      });

      this._microphoneController.on('recordtimer', timer => {

        this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer); //Usando a classe toTime do Format.js


      });

    });


    this.el.btnCancelMicrophone.on('click', e => {

      this._microphoneController.stopRecorder();
      this.closeRecordMicrophone();

    });

    this.el.btnFinishMicrophone.on('click', e => {

      this._microphoneController.stopRecorder();
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

      this._contactActive;

      Message.send(
        this._contactActive.chatId,
        this._user.email,
        'text',
        this.el.inputText.innerHTML
      );

      this.el.inputText.innerHTML = '';
      this.el.panelEmojis.removeClass('open');
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

  closeRecordMicrophone() {

    this.el.recordMicrophone.hide();
    this.el.btnSendMicrophone.show();


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

