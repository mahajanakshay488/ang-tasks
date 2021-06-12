import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from "rxjs/operators";
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  posts;
  isLoading: boolean = true;

  constructor(private appService: AppService){ }

  ngOnInit(){ 
       this.appService.getData()
       .subscribe(post => {
          this.isLoading = false;
          this.posts = post;
        console.log('appcomp/ngOnI',post)
       }, err => {
          this.isLoading = false;
         throwError(err)
        });
  }

  searchName(event){

    let sName = event.value.toLowerCase();
    this.isLoading = true;
    
    this.appService.getData()
    .pipe(map((posts: any) => {
      posts.data =  posts.data.filter(p => (p.firstName.toLowerCase().includes(sName) || p.lastName.toLowerCase().includes(sName)))
      return posts;
    }))
    .subscribe(posts => {
      this.isLoading = false;
      this.posts = posts;
      console.log('subscribe posts',posts);
    });
    
    console.log('searching..', sName);
  }

}
