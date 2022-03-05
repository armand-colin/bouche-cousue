import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, push, onValue, get } from "firebase/database";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPFXb0pkPsVI-YQr7UXivm2gf8XQzsfh0",
    authDomain: "bouche-cousue.firebaseapp.com",
    databaseURL: "https://bouche-cousue-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bouche-cousue",
    storageBucket: "bouche-cousue.appspot.com",
    messagingSenderId: "217228324432",
    appId: "1:217228324432:web:f9314109e52756d6296b55",
    measurementId: "G-TFJ0NJYD6J"
};

class Realtime {

    private app: FirebaseApp;
    private database: Database;

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app);
    }

    public set(item: string, data: any): Promise<void> {
        return set(ref(this.database, item), data)
    }

    public listen(item: string, listener: (value: any) => void) {
        onValue(ref(this.database, item), snapshot => {
            const data = snapshot.val()
            listener(data)
        });
    }

    public get(item: string): Promise<any> {
        return get(ref(this.database, item)).then(snapshot => {
            if (snapshot.exists()) 
                return snapshot.val()
            return null
        }).catch(error => console.error(error));
    }

    public push(parent: string): string {
        return push(ref(this.database, parent)).key!
    }

    public create(object: any, parent: string): string {
        const id = push(ref(this.database, parent)).key!
        this.set(`${parent}/${id}`, object)
        return id
    }
}

export default new Realtime()