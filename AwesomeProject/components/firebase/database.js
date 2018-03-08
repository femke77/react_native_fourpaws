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

    // WARNING: THIS WILL DELETE THE ACCOUNT AND CLEAR THE USERS DATABASE ENTRIES AT THE PATH LOCATION
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
    //use the names that match the database for the snapshot
    static listenUserName(userId, callback) {
        let userPath = "/users/" + userId + "/details";
        firebase.database().ref(userPath).on('value', (snapshot) => {
            let fname = "";
            let lname= "";
            let address= "";
            let city = "";
            let state="";
            let zipcode="";
            let contactNumber:"";

            if (snapshot.val()) {
                fname = snapshot.val().first_name;
                lname= snapshot.val().last_name;
                address= snapshot.val().address;
                city= snapshot.val().city;
                state= snapshot.val().state;
                zipcode= snapshot.val().zipcode;
                contactNumber= snapshot.val().contactNumber;
            }
            callback(fname, lname, address, city, state, zipcode, contactNumber)
        });
    }
}

