import {AuthenticationAPI} from './AuthenticationAPI';

class FirebaseAuthenticationAPI extends AuthenticationAPI{

  /**
   *
   * @param user
   * @returns {Promise}
   */
  sendLoginRequest(user){
      let promise = new Promise((resolve, reject) => {
        resolve("sample_token");
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

