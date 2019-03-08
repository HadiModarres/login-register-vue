import {AuthenticationAPI} from './AuthenticationAPI'
const firebase = require('firebase');
let config = require('@/helpers/configuration');

let firebaseInitialized = false;
class FirebaseAuthenticationAPI extends AuthenticationAPI{

  constructor() {
    super();
    console.log("config: " + config.FirebaseConfig);
    if (!firebaseInitialized) {
      firebase.initializeApp(config.FirebaseConfig);
      console.log('initializing')
      firebaseInitialized=true;
    }
  }

  /**
   *
   * @param user
   * @returns {Promise}
   */
  loginUser(user){
      // let promise = new Promise((resolve, reject) => {
      //   resolve("sample_token");
      // });
      // return promise;
    let db = firebase.firestore();
    let promise = new Promise((resolve, reject) => {
      db.collection("users").where("username", "==", user.username)
        .where('password', '==', user.password)
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
            resolve(doc.id);
            return;
          });
          reject('');
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    });
    return promise;
  }

  /**
   *
   * @param user
   * @returns {Promise}
   */
  registerUser(user){
    let db = firebase.firestore();
    let userAlreadyExists = false;
    let promise = new Promise((resolve,reject)=>{
      db.collection('users').where('username','==',user.username).get()
        .then((value => {
            // username exists
            value.forEach((doc)=>{
              reject("username already exists");
              userAlreadyExists = true;
            });
            if (userAlreadyExists){
              return;
            }
            //insert new user
            db.collection('users').add(user.getRegisterStructure()).then((docRef)=>{
              // added successfully
              resolve(user);
            },(error)=>{
              reject("register failed: " + error.message());
            });
        }));
    });

    return promise;
  }

  changePassword(user,newPassword){
    let db = firebase.firestore();
    let userRef = db.collection('users').doc(user._token);
    userRef.set({password: newPassword},{merge: true}).then((value => {
      window.alert('password updated');
    }),(reason => {
      window.alert('password update failed');
    }));
  }
}

export {FirebaseAuthenticationAPI}

