import {AuthenticationAPI} from './AuthenticationAPI'
const firebase = require('firebase');
let config = require('@/helpers/configuration');

class FirebaseAuthenticationAPI extends AuthenticationAPI{

  constructor() {
    super();
    console.log("config: " + config.FirebaseConfig);
    firebase.initializeApp(config.FirebaseConfig);


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
      db.collection("users").where("username", "==", user._username)
        .where('password', '==', user._password)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            resolve(doc.id);
          });
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
      db.collection('users').where('username','==',user._username).get()
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
}

export {FirebaseAuthenticationAPI}

