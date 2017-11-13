import * as firebase from "firebase";

export default class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyC3w2qXMs7I4tg-lip07qns5rHiVIsx4kE",
            authDomain: "fourpaws-acc49.firebaseapp.com",
            databaseURL: "https://fourpaws-acc49.firebaseio.com",
            projectId: "fourpaws-acc49",
            storageBucket: "fourpaws-acc49.appspot.com",
            messagingSenderId: "1002267002264"
        });
    }

}

