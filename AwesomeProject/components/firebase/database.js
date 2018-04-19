import * as firebase from "firebase";


export default class Database {

    //setters:

    static setUser(userId, contactNumber, fname, lname, username, email, image) {
        let userPath = "/users/" + userId + "/details";
        return firebase.database().ref(userPath).update({
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

    static setFromGoogleAccount(userId, userInfo){
        let userPath = "/users/" + userId + "/details/";
        return firebase.database().ref(userPath).update({
            image: userInfo.photoURL,
        })

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

    static listenGoogleAccountInfo(userId, callback) {
        let userPath = "/users/" + userId + "/details";
        firebase.database().ref(userPath).on('value', (snapshot) => {
            let data = {
                image: "",

            };
            if (snapshot.val()) {
                data.image = snapshot.val().image;

            }
            callback(data)
        });
    }

    //use this is you need to retrive data and send back to state, need to write callback function in the correct component
    //use the names that match the database for the snapshot
    static listenUserInfo(userId, callback) {
        let userPath = "/users/" + userId + "/details";
        firebase.database().ref(userPath).on('value', (snapshot) => {
            let data = {
             fname: "",
             lname: "",
             address: "",
             city: "",
             state: "",
             zipcode : "",
             contactNumber: "",
             image: ""
            };

            if (snapshot.val()) {
                data.fname = snapshot.val().first_name;
                data.lname= snapshot.val().last_name;
                data.address= snapshot.val().address;
                data.city= snapshot.val().city;
                data.state= snapshot.val().state;
                data.zipcode= snapshot.val().zipcode;
                data.contactNumber= snapshot.val().contactNumber;
                data.image = snapshot.val().image;
            }
            callback(data)
        });
    }

    static findUID(userId, callback){
        let userPath = "/users/" + userId;
        firebase.database().ref(userPath).once('value', (snapshot) => {
            let bool = false;
            if (snapshot.exists()) {
                bool = true;
            }
            callback(bool);
        });

    }

    static listenChatUsers(userId, callback) {
        let userPath = "/users/" + userId + "/messages/";
        firebase.database().ref(userPath).on('value', (snapshot) => {
            let list = [];

            if (snapshot.val()) {
                snapshot.forEach((child) => {
                    firebase.database().ref(userPath + child.val().id).on('value', (snapshot) => {
                        list.push({
                            name: snapshot.val().name,
                            avatar: snapshot.val().avatar,
                            id: snapshot.val().id,
                            uid: snapshot.val().uid,
                        })
                    })

                });
            }
            callback(list);
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

    static removeChat(userId, id) {
        let userPath = "/users/" + userId + "/messages/" + id;
        return firebase.database().ref(userPath).remove()
            .catch(function (error) {
                console.log(error)

            });

    }


}
