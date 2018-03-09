import * as firebase from "firebase";


export default class Database {

    //setters:

    static setUser(userId, contactNumber, fname, lname, username, email, image) {
        let userPath = "/users/" + userId + "/details";
        return firebase.database().ref(userPath).set({
            contactNumber: contactNumber,
            first_name: fname,
            last_name: lname,
            user_name: username,
            email: email,
            image: image
        })
    }


    static setUser2(userId, address, city, state, zipcode) {
        let userPath = "/users/" + userId + "/details/";
        return firebase.database().ref(userPath).update({
            address: address,
            city: city,
            state: state,
            zipcode: zipcode
        });
    }

    static setReview(userId, id, name, review, reviewer_uid) {
        let userPath = "/users/" + userId + "/reviews/";
        return firebase.database().ref(userPath).push({
            id: id,
            name: name,
            review: review,
            reviewer_uid: reviewer_uid
        });
    }

    static setFavoritePetKeepers(userId, favoriteId, num) {
        let userPath = "/users/" + userId + "/favorites/" + num;
        return firebase.database().ref(userPath).set({
            user_uid: favoriteId,

        });
    }

    //listeners:

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


    static listenFavoriteUsers(userId, callback) {
        let userPath = "/users/" + userId + "/favorites/";
        firebase.database().ref(userPath).on('value', (snapshot) => {
            let list = [];

            if (snapshot.val()) {
                snapshot.forEach((child) => {

                    firebase.database().ref("/users/" + child.val().user_uid + "/details/").on('value', (snapshot) => {
                        list.push({
                            key: "01",  //push key will be here when done properly
                            name: snapshot.val().first_name,
                            image: snapshot.val().image,
                            email: snapshot.val().email
                        })
                    })

                });
            }
            callback(list);
        });
    }


    static listenReviews(userId, callback) {
        let userPath = "/users/" + userId + "/reviews";
        firebase.database().ref(userPath).on("value", (snapshot) => {
            let items = [];
            if (snapshot.val()) {
                snapshot.forEach((child) => {
                    items.push({
                        id: child.key,
                        name: child.val().name,
                        review: child.val().review,
                        reviewer_uid: child.val().reviewer_uid
                    })
                })
            }

            callback(items)
        });
    }

    //remove:

    // WARNING: THIS WILL DELETE THE ACCOUNT AND CLEAR ALL THE USERS DATABASE ENTRIES AT THE PATH LOCATION
    static remove(userId) {
        let userPath = "/users/" + userId + "/details";
        return firebase.database().ref(userPath).remove().then(function () {
            firebase.auth().currentUser.delete()
        }).catch(function (error) {
            console.log(error)
        });
    }


    static removeFavorite(userId, key) {
        let userPath = "/users/" + userId + "/favorites/" + key;
        return firebase.database().ref(userPath).remove()
            .catch(function (error) {
            console.log(error)

        });

    }


}
