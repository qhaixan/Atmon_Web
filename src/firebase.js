import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyC8Sh3mH_8fmWTx05KbIWWTINjYK8UbJH0",
  authDomain: "attendancetaker-fa95e.firebaseapp.com",
  databaseURL: "https://attendancetaker-fa95e.firebaseio.com",
  projectId: "attendancetaker-fa95e",
  storageBucket: "attendancetaker-fa95e.appspot.com",
  messagingSenderId: "770694207027"
});

export const db = app.database();
export const classroomRef = db.ref('classroom');
export const studentRef = db.ref('student');
export const subjectRef = db.ref('subject');
export const apRef = db.ref('AP');
export const weekRef = db.ref('week');
export const serverRef = db.ref('server');
export const replacementRef = db.ref('replacement');
export const userRef = db.ref('user');
