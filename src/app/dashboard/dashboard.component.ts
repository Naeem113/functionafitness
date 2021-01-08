import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                        CONSTRUCTOR                                             /
  //****************************************************************************************************************/

  constructor() {
    firebase.firestore().collection('Emotions')
    .get()
    .then((response) => {
      this.Total_Emotions = response.size;
      this.spinner = false;
    });
    firebase.firestore().collection('Skills')
    .get()
    .then((response) => {

      this.Total_Skills = response.size;
      console.log(this.Total_Skills);

      this.spinner = false;
    });
    firebase.firestore().collection('Journals')
    .get()
    .then((response) => {
      this.Total_Journals = response.size;
      this.spinner = false;
      this.progressBar = false;
    });
   }
   Total_Emotions:any;
   Total_Skills:any;
   Total_Journals:any;
   progressBar:boolean=true

   spinner:boolean=true;
  ngOnInit(): void {
  }



  
}
