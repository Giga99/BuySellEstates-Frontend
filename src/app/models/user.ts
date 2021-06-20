export class User {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    city: string;
    country: string;
    accepted: boolean;
    reviewed: boolean;
    userType: string;
    agency: string;
    profileImage: string;

    constructor(firstname, lastname, username, password, email, city, country, profileImage) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.city = city;
        this.country = country;
        this.profileImage = profileImage;
        this.userType = "user";
        this.accepted = false;
        this.reviewed = false;
    }
}