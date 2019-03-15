import {AuthenticationAPI} from './AuthenticationAPI'
const firebase = require('firebase');
let config = require('@/helpers/configuration');
import {User} from "@/services/User";

let firebaseInitialized = false;
class FirebaseAuthenticationAPI extends AuthenticationAPI{

  constructor() {
    super();
    // console.log("config: " + config.FirebaseConfig);
    if (!firebaseInitialized) {
      firebase.initializeApp(config.FirebaseConfig);
      console.log('initializing');
      firebaseInitialized=true;
    }
  }
  updatePassword(user,password){
    let promise = new Promise((resolve, reject) => {
      firebase.auth().currentUser.updatePassword(password).then((value => {
        resolve();
      }),(reason => {
        reject(reason);
      }));

    });
    return promise;
  }

  signOut(user){
    let promise = new Promise((resolve, reject) => {
      firebase.auth().signOut().then((value => {
        resolve();
      }), (reason => {
        reject(reason);
      }));
    });

    return promise;
  }

  /**
   *
   * @param user
   * @returns {Promise}
   */
  loginUser(user){
    let promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.username, user.password).then((value)=>{
        resolve(value);
      },(reason => {
        reject(reason);
      }));
    });

    return promise;
    // let db = firebase.firestore();
    // let promise = new Promise((resolve, reject) => {
    //   db.collection("users").where("username", "==", user.username)
    //     .where('password', '==', user.password)
    //     .get()
    //     .then(function (querySnapshot) {
    //       console.log('got data');
    //       querySnapshot.forEach(function (doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log('hello');
    //         console.log(doc.id, " => ", doc.data());
    //         user.firstName = doc.data().firstname;
    //         user.lastName = doc.data().lastname;
    //         user.phone = doc.data().phone;
    //         resolve(doc.id);
    //         return;
    //       });
    //       reject('');
    //     })
    //     .catch(function (error) {
    //       console.log("Error getting documents: ", error);
    //     });
    // });
    // return promise;
  }

  addUserData(user){
    let db = firebase.firestore();
    let promise = new Promise((resolve,reject)=>{
      db.collection('users').add(user.getRegisterStructure()).then((docRef)=>{
        // added successfully
        resolve(user);
      },(error)=>{
        reject("register failed: " + error.message());
      });
    });
    return promise;
  }

  getCurrentUser(){
    let curUser = firebase.auth().currentUser;
    let user = new User();
    let db = firebase.firestore();
    let email = curUser.email;

    let promise = new Promise((resolve, reject) => {
      db.collection("users").where("username", "==", email)
        .get()
        .then(function (querySnapshot) {
          console.log('got data');
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log('hello');
            console.log(doc.id, " => ", doc.data());
            user.firstName = doc.data().firstname;
            user.lastName = doc.data().lastname;
            user.phone = doc.data().phone;
            resolve(user);
            return;
          });
          reject('user not found');
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    });
    return promise;
  }

  isLoggedIn(){
    if (!firebase.auth().currentUser) {
      return false;
    }
    return true;
  }
  /**
   *
   * @param user
   * @returns {Promise}
   */
  registerUser(user){
    let promise = new Promise((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(user.username, user.password).then((value => {
        resolve(value);
      }), reason => {
        reject(reason);
      });
    });

    return promise;

    // let db = firebase.firestore();
    // let userAlreadyExists = false;
    // let promise = new Promise((resolve,reject)=>{
    //   db.collection('users').where('username','==',user.username).get()
    //     .then((value => {
    //         // username exists
    //         value.forEach((doc)=>{
    //           reject("username already exists");
    //           userAlreadyExists = true;
    //         });
    //         if (userAlreadyExists){
    //           return;
    //         }
    //         //insert new user
    //         db.collection('users').add(user.getRegisterStructure()).then((docRef)=>{
    //           // added successfully
    //           resolve(user);
    //         },(error)=>{
    //           reject("register failed: " + error.message());
    //         });
    //     }));
    // });
    // return promise;
  }

}

export {FirebaseAuthenticationAPI}

