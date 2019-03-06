class AuthenticationAPI {
  /**
   *
   * @param user
   * @returns {Promise}
   */
  sendLoginRequest(user){
    throw Error("do not call the method on base class");
  }

  /**
   *
   * @param user
   * @returns {Promise}
   */
  sendRegiserRequest(user){
    throw Error("do not call the method on base class");
  }

}
