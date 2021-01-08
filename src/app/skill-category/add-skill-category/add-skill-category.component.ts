import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormService} from '../../form'
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-skill-category',
  templateUrl: './add-skill-category.component.html',
  styleUrls: ['./add-skill-category.component.css']
})
export class AddSkillCategoryComponent implements OnInit {

  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar) {
   
  }
  progressBar:boolean=false;
  ngOnInit(): void {
  }

   //****************************************************************************************************************/
  //                                                 ADD QUOTES DATA FUNCTION                                       /
  //****************************************************************************************************************/

  addSkillCategory(data:any) {
    console.log(data);
    var id = Math.random().toString(36).substring(2);
    data.created_at=new Date()
    data.category_id = id;

    firebase.firestore().collection('Skill_Categories').doc(id).set(data)
    .then(()=>{
      this.route.navigate(['/skill-categories']);
          this.snackBar.open('Successfully add Skill Category', 'close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.Form.addSkillCategory.reset()
          this.progressBar=true
    })

    

  }

}
