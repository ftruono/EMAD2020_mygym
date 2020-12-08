import { firestore } from "firebase";
import { FirebaseAutentication, Firestore } from "../config/FirebaseConfig";

class UtentiService {

    UTENTI_COLLECTION = "UTENTI";


    constructor() {

    }


    insertDefaultData = async (data) => {
        var id, error;
        FirebaseAutentication.createUserWithEmailAndPassword(data.email, data.password).then((user) => {
            id = user.user.uid;
        }).catch((e) => error = e.code);

        Firestore.collection(this.UTENTI_COLLECTION).doc(id).set({
            diete: [],
            schede: [],
            type: data.type,
            scadenza_abbonamento: moment().add(2,'M').format('DD-M-YYYY')
        });
    
    }

}

export default UtentiService;