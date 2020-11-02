const firebase = require('firebase');
require ('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyBNs6KOyOt-7TzPhmQbKX7dJDfuByuz9M8",
            authDomain: "whatsapp-clone-af5f3.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-af5f3.firebaseio.com",
            projectId: "whatsapp-clone-af5f3",
            storageBucket: "whatsapp-clone-af5f3.appspot.com",
            messagingSenderId: "1049088378726",
            appId: "1:1049088378726:web:7b1990cd50aad49af46aa7",
            measurementId: "G-N3Y8KGZM33"
        };


        this.init();

    }

    init() {

        if (!this.initializeApp) {

            firebase.initializeApp(this._config);


            firebase.firestore().settings({

               // timestampsInSnapshots: true

            });

            this.initializeApp = true;


        }



    }
        static db() {

            return firebase.firestore();
        }

        static hd(){

            return firebase.storage();
        }

}