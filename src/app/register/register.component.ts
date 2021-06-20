import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FilesService } from '../files.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  city: string;
  country: string;
  image;
  imagePreview;

  constructor(
    private authService: AuthService,
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imagePreview = reader.result; 
      }
    }
  }

  register() {
    this.filesService.uploadSingleFile(this.image).subscribe((response) => {
      let path: string = response['path'];
      const user = new User(
        this.firstname, this.lastname, this.username, this.password, this.email, this.city, this.country, "../.." + path.substring(19).replace("\\", "/").replace("\\", "/").replace("\\", "/")
      );
  
      this.authService.register(user).subscribe(response => {
        if (response['message'] == 'user added') {
          alert('OK');
        }
      });
    });
  }
}
