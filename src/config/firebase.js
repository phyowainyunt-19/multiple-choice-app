import Firebase from 'firebase'
let config = {
    apiKey: "AIzaSyC97oP1bNq5Xu3YQJkLFrWuxC6AD8G3uxc",
    authDomain: "quiz-e93cf.firebaseapp.com",
    databaseURL: "https://quiz-e93cf.firebaseio.com",
    projectId: "quiz-e93cf",
    storageBucket: "quiz-e93cf.appspot.com",
    messagingSenderId: "746273427549",
    appId: "1:746273427549:web:f9173bfb48a28004c5fdb4",
    measurementId: "G-BP10RJYDRY"
};
let app = Firebase.initializeApp(config)
export const database = app.database()