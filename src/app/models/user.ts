export class User {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    profileImage: string;
    email: string;
    city: string;
    country: string;
    accepted: boolean;
    userType: string;
    agency: string;

    constructor(firstname, lastname, username, password, email, city, country) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.city = city;
        this.country = country;
        this.userType = "user";
        this.accepted = false;
        this.profileImage = '';
    }
}