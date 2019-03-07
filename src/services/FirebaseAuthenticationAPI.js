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
  sendLoginRequest(user){
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
  sendRegiserRequest(user){
   // todo
  }
}

export {FirebaseAuthenticationAPI}

