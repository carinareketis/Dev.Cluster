const firebaseConfig = {
	apiKey: "AIzaSyAzrk9GshXfULSGRQwUaE3SUaQ8m0ptbSk",
	authDomain: "rede-social-34b85.firebaseapp.com",
	databaseURL: "https://rede-social-34b85.firebaseio.com",
	projectId: "rede-social-34b85",
	storageBucket: "rede-social-34b85.appspot.com",
	messagingSenderId: "867889652770",
	appId: "1:867889652770:web:5244ec3fb7a97263"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();