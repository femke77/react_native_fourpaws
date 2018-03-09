
import Database from '../firebase/database.js';



export default class Temp {

    //replace reviews:

    static tempWriteReviews() {

        Database.setReview(this.state.uid, '', 'Alison', " I loved the service that fourpaws provide blah blah and the pet keeper was amazing!" +
            " I loved the service that fourpaws provide blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ", 'sDgzGISKnBQ4DmPv9RcJJyineJE2');
        Database.setReview(this.state.uid, '', 'Susan', " blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ",
            'vwpfytfNHbPTF24mKL0ggeptT3f1');
        Database.setReview(this.state.uid, '', 'Billy', " blah blah and the pet keeper was amazing! I loved the service " +
            "that fourpaws provide blah blah and the pet keeper was amazing! ",
            'vwpfytfNHbPTF24mKL0ggeptT3f1')
    }






}