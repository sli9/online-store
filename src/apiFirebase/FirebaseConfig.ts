import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {collection, getDocs, getFirestore, orderBy, query, where} from "firebase/firestore"
import {CategoriesType} from "../components/categories";


// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)


// shopAPI
const motoCollectionRef = collection(db, 'motorcycles')


export const shopAPI = {
    getMoto(category: CategoriesType, sortIndex: string) {
        let bikes = query(motoCollectionRef)

        if (category !== 'all' && sortIndex !== '') {
            sortIndex.includes('Desc') ?
                bikes = query(motoCollectionRef,
                    where('type', '==', category),
                    orderBy(sortIndex.replace('Desc', ''), 'desc')) :
                bikes = query(motoCollectionRef,
                    where('type', '==', category),
                    orderBy(sortIndex))
        }
        if (category !== 'all' && sortIndex === '') {
            bikes = query(motoCollectionRef, where('type', '==', category))
        }
        if (category === 'all' && sortIndex !== '') {
            sortIndex.includes('Desc') ?
                bikes = query(motoCollectionRef,
                    orderBy(sortIndex.replace('Desc', ''), 'desc')) :
                bikes = query(motoCollectionRef,
                    orderBy(sortIndex))
        }

        return getDocs(bikes)
    }
}

// authAPI
export const authAPI = {
    login() {
        return signInWithPopup(auth, googleProvider);
    },
    logout() {
        return auth.signOut();
    },
}