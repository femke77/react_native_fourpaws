import * as firebase from "firebase";


export default class Database {


    static setUser(userId, contactNumber, fname, lname, username, email) {
        let userPath = "/users/" + userId + "/details";
        return firebase.database().ref(userPath).set({
            contactNumber: contactNumber,
            first_name: fname,
            last_name: lname,
            user_name: username,
            email: email
        })
    }

    // WARNING THIS WILL DELETE THE ACCOUNT AND CLEAR THE USERS DATABASE ENTRIES AT THE PATH LOCATION
    static remove(userId){
        let userPath = "/users/" + userId + "/details";
        return firebase.database().ref(userPath).remove().then(function() {
            firebase.auth().currentUser.delete()
            }).catch(function(error){
                console.log(error)
            });
    }

    static setUser2(userId, address, city, state, zipcode){
        let userPath = "/users/" + userId + "/details/";
        return firebase.database().ref(userPath).update({
            address: address,
            city: city,
            state: state,
            zipcode: zipcode
        });
    }

  //use this is you need to retrive data and send back to state, need to write callback function in the correct component
    static listenUser(userId, callback) {
        let userPath = "/users/" + userId + "/details";
        firebase.database().ref(userPath).on('value', (snapshot) => {
            var contactNumber = "";

            if (snapshot.val()) {
                contactNumber = snapshot.val().contactNumber;
            }
            callback(contactNumber)
        });
    }
}

