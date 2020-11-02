import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor() {

        super(); //Chama o construtor do PAI dele, de quem ele está extends ClassEvent>constructor <Herança>

        this._mimeType = 'audio/webm';

        this._available = false; //Variavel criada para identificar se o audio está disponóveç para gravar

        navigator.mediaDevices.getUserMedia({

            audio: true

        }).then(stream => {

            this._available = true;

            this._stream = stream;

            //   let audio = new Audio();
            // audio.src = URL.createObjectURL(stream);

            //  audio.srcObject = stream;
            //   audio.play();

            this.trigger('ready', this._stream);

        }).catch(err => {

            console.error(err);

        });


    }

    isAvailable() {

        return this._available;

    }

    stop() {

        this._stream.getTracks().forEach(track => {

            track.stop();

        });

    }

    startRecorder() {

        if (this.isAvailable()) {

            this._mediaRecorder = new MediaRecorder(this._stream, {

                mimeType: this._mimeType

            });

            this._recorderChunks = [];

            this._mediaRecorder.addEventListener('dataavailable', e => {

                if (e.data.size > 0) this._recorderChunks.push(e.data);

            });

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recorderChunks, {
                    type: this._mimeType
                });

                let filename = `re${Date.now()}.webm`;

                let file = new File([blob], filename, {

                    type: this._mimeType,
                    lastModified: Date.now()
                });

                console.log('file', file);

                let reader = new FileReader();

                reader.onload = e => { // Para ouvir o áudio.

                    console.log('reader file', file);

                    let audio = new Audio(reader.result);

                    audio.play(); //tocando audio.

                }
                reader.readAsDataURL(file);

            });

            this._mediaRecorder.start();
            this.startTimer();

        }



    }

    stopRecorder() {

        if (this.isAvailable()) {

            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();

        }

     }

     startTimer(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

        

            this.trigger('recordtimer', (Date.now() - start));

        }, 100);

     }

     stopTimer(){

        clearInterval(this._recordMicrophoneInterval); //Parando o timer

     }




}