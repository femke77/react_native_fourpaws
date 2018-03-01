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

    static setReview(userId, id, name, review, image, reviewer_uid){
        let userPath = "/users/" + userId + "/reviews/";
        return firebase.database().ref(userPath).push({
            id: id,
            name: name,
            review: review,
            image: image,
            reviewer_uid: reviewer_uid
        });
    }

    static listenUserName(userId, callback) {
        let userPath = "/users/" + userId + "/details";
        firebase.database().ref(userPath).on('value', (snapshot) => {
            let data = {
                fname: "",
                lname: ""
            };
            if (snapshot.val()) {
                data.fname = snapshot.val().first_name;
                data.lname = snapshot.val().last_name;
            }
            callback(data)
        });
    }

    static listenReviews(userId, callback) {
        let userPath = "/users/" + userId + "/reviews";
        firebase.database().ref(userPath).once('value', (snapshot) => {
            let items = [];
            if (snapshot.val()){
                snapshot.forEach((child) => {
                    items.push({
                        id: child.key,
                        name: child.val().name,
                        review: child.val().review,
                        image: child.val().image,
                        reviewer_uid: child.val().reviewer_uid
                    })
            })}

            callback(items)
        });
    }


}

