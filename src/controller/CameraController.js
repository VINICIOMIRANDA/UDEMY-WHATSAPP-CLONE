class CameraController{

    constructor(videoEl) {

        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({

            video: true

        }).then(stream=>{

            this._videoEl.src = URL.createObjectURL(stream); // Vai criar um objeto binario
            this._videoEl.play();  
                                                           // Mostrar na tela
        }).catch(err=>{

            console.error(err);

        })


        
    }
} 