// Imports
import admin from "firebase-admin";
import {Auth, getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";
import {getPerformance} from "firebase/performance";
import {Firestore, getFirestore} from "firebase/firestore";
import {FirebaseApp, getApps, initializeApp} from "firebase/app";
import {IFirebaseConfig, IFirebaseUser} from "@/types/firebase";
import {cert} from "firebase-admin/app";
/* TODO: Add SDKs for Firebase products that you want to use
 https://firebase.google.com/docs/web/setup#available-libraries

 Your web app's Firebase configuration
 For Firebase JS SDK v7.20.0 and later, measurementId is optional */

// FireBase Web App Configuration
export const firebaseConfig: IFirebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? ""}`,
	authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? ""}`,
	projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? ""}`,
	storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? ""}`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? ""}`,
	appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? ""}`,
	measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? ""}`,
};

const hasRealValue = (value?: string) =>
	Boolean(value && value !== "undefined" && value !== "null" && value.trim());

export const isFirebaseConfigured = () => hasRealValue(firebaseConfig.apiKey);

export const getOptionalAuth = (): Auth | undefined => {
	try {
		if (!isFirebaseConfigured() && !getApps().length) {
			return undefined;
		}
		return getAuth();
	} catch (error) {
		console.log(error);
		return undefined;
	}
};

// Firebase User Details
export const firebaseUser = {
	uid: ``,
	email: ``,
	providerId: ``,
	phoneNumber: ``,
	displayName: ``,
	photoURL: ``,
	metadata: {
		creationTime: ``,
		lastSignInTime: ``,
	},
};

export const initializeFirebase = () => {
	try {
		if (!isFirebaseConfigured()) {
			return firebaseUser;
		}

		if (!getApps().length) {
			// Initializing Firebase
			const app: FirebaseApp = initializeApp(firebaseConfig);

			// Creating auth for Authentication
			const auth: Auth = getAuth(app);

			// Initialize Cloud Firestore and get a reference to the service
			const db: Firestore = getFirestore(app);

			// Firebase Admin SDK
			const serviceAccount: any = "../firebase/service-account-key.json";
			// const admin = cert(serviceAccount);
			// const serviceAccount = require("../firebase/service-account-key.json");
			// admin.initializeApp({
			// 	credential: admin.credential.cert(serviceAccount),
			// });

			// Firebase User Details
			const firebaseUser = {
				uid: `${auth?.currentUser?.uid}`,
				email: `${auth?.currentUser?.email}`,
				photoURL: `${auth?.currentUser?.photoURL}`,
				providerId: `${auth?.currentUser?.providerId}`,
				phoneNumber: `${auth?.currentUser?.phoneNumber}`,
				displayName: `${auth?.currentUser?.displayName}`,
				metadata: {
					creationTime: `${auth?.currentUser?.metadata.creationTime}`,
					lastSignInTime: `${auth?.currentUser?.metadata.lastSignInTime}`,
				},
			};

			// Analytics/Performance call Installations and crash with a bad API key
			if (
				typeof window !== "undefined" &&
				hasRealValue(firebaseConfig.measurementId)
			) {
				getAnalytics(app);
				getPerformance(app);
			}

			console.log(`Firebase initialization successful`);
			return firebaseUser;
		}
	} catch (error) {
		console.log(error);
		return firebaseUser;
	}
};

export default initializeFirebase;
