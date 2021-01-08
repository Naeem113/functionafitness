import { Component, OnInit } from '@angular/core';
import {FormService} from '../../form'
import firebase from 'firebase/app'
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-what-am-i-feeling',
  templateUrl: './detail-what-am-i-feeling.component.html',
  styleUrls: ['./detail-what-am-i-feeling.component.css']
})
export class DetailWhatAmIFeelingComponent implements OnInit {

  //****************************************************************************************************************/
  //                                                     CONSTRUCTOR                                                /
  //****************************************************************************************************************/
  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar,private router: ActivatedRoute) {
    this.router.params.subscribe((params) => {
      this.emotion_id = params.key;})
    firebase.firestore().collection('Emotions').doc(this.emotion_id).get().then
    (res=>{
 
        this.emotionsList= res.data()
        console.log(this.emotionsList);
        this.progressBar=true
        this.progressBar2=false
      
    });
  }

  progressBar:boolean=false;
  progressBar2:boolean=true;
  emotionsList:any;
  emotion_id:string;
  ngOnInit(): void {
  }

}
