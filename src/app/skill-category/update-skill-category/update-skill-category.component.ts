import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormService} from '../../form'
import firebase from 'firebase/app'
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-skill-category',
  templateUrl: './update-skill-category.component.html',
  styleUrls: ['./update-skill-category.component.css']
})
export class UpdateSkillCategoryComponent implements OnInit {

 //****************************************************************************************************************/
  //                                                     CONSTRUCTOR                                                /
  //****************************************************************************************************************/
  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar,private router: ActivatedRoute) {
    this.router.params.subscribe((params) => {
      this.skillCategory_id = params.key;})
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

  skillCategory_id:string;
  progressBar:boolean=false;
  progressBar2:boolean=true;
  skillCategoryList:any[] = [];

  ngOnInit(): void {

    firebase.firestore()
    .collection('Skill_Categories')
    .doc(this.skillCategory_id)
    .get()
    .then((response) => {
      let data:any = response.data();
      console.log(data);
      this.Form.updateSkillCategory.patchValue({
        title: data.title,
      })
    });
  }

    //****************************************************************************************************************/
  //                                                  UPDATE QUOTES DATA FUNCTION                                   /
  //****************************************************************************************************************/

  updateSkillCategory(data: any) {
    // console.log(data);
    // var id = Math.random().toString(36).substring(2);
    data.updated_at=new Date()
    data.category_id = this.skillCategory_id;

    firebase.firestore().collection('Skill_Categories').doc(this.skillCategory_id).update(data)
    .then(()=>{
      this.route.navigate(['/skill-categories']);
          this.snackBar.open('Successfully Update Skill Category', 'close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.Form.updateSkillCategory.reset()
          this.progressBar=true
    })

   
  }



}
