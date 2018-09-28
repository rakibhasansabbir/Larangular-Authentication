import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseURL = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(`${this.baseURL}/signup`, data);
  }

  login(data) {
    return this.http.post(`${this.baseURL}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseURL}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseURL}/resetPassword`, data);

  }
}
