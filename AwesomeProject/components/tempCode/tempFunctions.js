
import Database from '../firebase/database.js';



export default class Temp {

    //replace reviews:

    tempWriteReviews() {

        Database.setReview(this.state.uid, '', 'Alison', " I loved the service that fourpaws provide blah blah and the pet keeper was amazing!" +
            " I loved the service that fourpaws provide blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ", {"uri": "https://static.pexels.com/photos/324658/pexels-photo-324658.jpeg"},
            'sDgzGISKnBQ4DmPv9RcJJyineJE2');
        Database.setReview(this.state.uid, '', 'Susan', " blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ", {"url": "https://static.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg"},
            'vwpfytfNHbPTF24mKL0ggeptT3f1');
        Database.setReview(this.state.uid, '', 'Billy', " blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ", {"url": "https://static.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg"},
            'vwpfytfNHbPTF24mKL0ggeptT3f1')
    }


    //replace data for favpetkeeper:

    tempWriteData() {






    }



}