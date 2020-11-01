export class CameraController {

    constructor(videoEl) {

        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({

            video: true

        }).then(stream => {

            // this._videoEl.src = URL.createObjectURL(stream); // Vai criar um objeto binario

            this._stream = stream;
            this._videoEl.srcObject = stream;
            this._videoEl.play();
            // Mostrar na tela
        }).catch(err => {

            console.error(err);

        });


    }

    stop() {

        this._stream.getTracks().forEach(track => {

            track.stop();

        });

    }

    takePicture(mimeType = 'image/png') {

        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl.videoHeight); // Altura 
        canvas.setAttribute('width', this._videoEl.videoWidth); // Largura
        
        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType); // Converter para b 64 

    }

}

