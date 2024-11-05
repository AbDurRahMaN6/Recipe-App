const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

class User {
    constructor(firstname, lastname, email, password, favorites = []) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.favorites = favorites;
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }
}

module.exports = User;
