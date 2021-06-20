import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  uploadSingleFile(image) {
    const formData = new FormData();
    formData.append('file', image);

    return this.http.post(`${Constants.URI}/files/uploadSingleFile`, formData);
  }

  uploadMultipleFiles(images) {
    const formData = new FormData();

    for (let img of images) {
      formData.append('files', img);
    }

    return this.http.post(`${Constants.URI}/files/uploadMultipleFiles`, formData);
  }
}
