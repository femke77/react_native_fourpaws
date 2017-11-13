import * as firebase from "firebase";

export default class Database {


    static setUserMobile(userId, mobile) {
        let userMobilePath = "/user/" + userId + "/details";
        return firebase.database().ref(userMobilePath).set({
            mobile: mobile
        })

    }


    static listenUserMobile(userId, callback) {
        let userMobilePath = "/user/" + userId + "/details";
        firebase.database().ref(userMobilePath).on('value', (snapshot) => {
            var mobile = "";
            if (snapshot.val()) {
                mobile = snapshot.val().mobile
            }
            callback(mobile)
        });
    }
}

