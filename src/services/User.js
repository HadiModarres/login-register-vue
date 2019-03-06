class User {
  constructor() {
    this.__username = undefined;
    this.__password = undefined;
    this.__token = undefined;
  }

  set _username(value) {
    this.__username = value;
  }

  set _password(value) {
    this.__password = value;
  }


  set _token(value) {
    this.__token = value;
  }

  login(){

  }
  register(){
  }

}

export {User}
