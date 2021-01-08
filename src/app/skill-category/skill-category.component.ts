import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormService} from '../form'
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-skill-category',
  templateUrl: './skill-category.component.html',
  styleUrls: ['./skill-category.component.css']
})
export class SkillCategoryComponent implements OnInit {

 //****************************************************************************************************************/
  //                                                     CONSTRUCTOR                                                /
  //****************************************************************************************************************/
  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar) {
    firebase.firestore().collection('Skill_Categories').orderBy('created_at','desc')
    .onSnapshot(res=>{
      this.skillCategoryList=[]
      res.forEach(list=>{    
        this.skillCategoryList.push(list.data())
        console.log(this.skillCategoryList);
     
          this.progressBar2=false
          this.progressBar=true
      })
    });
  }

  // errorText:string=null;
  progressBar:boolean=false;
  progressBar2:boolean=true;
  skillCategoryList:any[] = [];
  //****************************************************************************************************************/
  //                                                       ngOnInIt                                                 /
  //****************************************************************************************************************/

  ngOnInit() {
    
  }



  //****************************************************************************************************************/
  //                                                 DELETE QUOTES DATA FUNCTION                                    /
  //****************************************************************************************************************/

  RemoveJournal(id:any) {
    if (confirm('Are you sure to delete this record?')) {

      firebase.firestore()
        .collection('Skill_Categories')
        .doc(id)
        .delete()
        .then((Response) => {
          this.snackBar.open('Skill Category Deleted', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        });
    }
  }

}
