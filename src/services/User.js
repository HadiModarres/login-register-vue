class User {

  constructor() {
    this.username = undefined;
    this.password = undefined;
    this.token = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.phone = undefined;
  }

  getRegisterStructure() {
    return {
      username: this.username,
      password: this.password,
      phone: this.phone,
      firstname: this.firstName,
      lastname: this.lastName
    };
  }

}

export {User}
