import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Post{
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  picture: string,
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get<Array<Post>>('https://dummyapi.io/data/api/user', {headers: {'app-id': "60b6023c98e5768341aefad0"}} )
  }
}
