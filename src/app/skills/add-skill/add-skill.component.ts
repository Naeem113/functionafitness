import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormService} from '../../form'
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {


  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar) {
    firebase.firestore().collection('Skill_Categories').orderBy('created_at','desc')
    .onSnapshot(res=>{
      this.skillCategoryList=[]
      res.forEach(list=>{    
        this.skillCategoryList.push(list.data())
        console.log(this.skillCategoryList);
      
      })
    });
    

  }

  //****************************************************************************************************************/
  //                                                       NgOnInit                                                 /
  //****************************************************************************************************************/


  ngOnInit() {
   
  }

  //****************************************************************************************************************/
  //                                                  VERIABLE DECLARATION                                          /
  //****************************************************************************************************************/

  skillCategoryList:any[] = [];
  myStyle:any;
  file: any;
  image:boolean=true;
  fileName!: string;
  uploading:any;
  displayImage:any;
  uploadProgress: boolean = false;

  //****************************************************************************************************************/
  //                                                    ng-IF Div Fuctions                                          /
  //****************************************************************************************************************/



  //****************************************************************************************************************/
  //                                                SERVICE DATA SUBSCRIPTION                                       /
  //****************************************************************************************************************/

  ServiceDataSubscription() {
   
  }

  //****************************************************************************************************************/
  //                                                   ADD EQUIPMENTS DATA                                          /
  //****************************************************************************************************************/

  addSkill(data ) {
    console.log(data);
    var id = Math.random().toString(36).substring(2);
    data.created_at=new Date()
    data.skill_id = id;
    data.list_of_string = data.list_of_string.split(',');
    this.uploadFile().then((url:any) => {
      data.image = url;
      firebase.firestore().collection('Skills').doc(id).set(data)
      .then(()=>{
        this.route.navigate(['/skills']);
            this.snackBar.open('Successfully add Journal String', 'close', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            this.Form.addSkill.reset()
            this.displayImage=null
      })
    }).catch(err=>{
      this.snackBar.open(err.message, 'close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    })
    


  }



  //****************************************************************************************
  //   File Getting                                                      start  *
  //****************************************************************************************

  processFile(event:any) {
    this.file = event.target.files[0];
    var t = this.file.type.split('/').pop().toLowerCase();
    if (t != 'jpeg' && t != 'jpg' && t != 'png' && t != 'bmp' && t != 'gif') {
      alert('Please select a valid image file');
      return false;
    }
    this.image = false;
    this.fileName = this.file.name;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.displayImage = e.target.result;
    };
    reader.readAsDataURL(this.file);
  }

  uploadFile() {
    return new Promise((resolve, reject) => {
      this.uploadProgress = true;
      const filePath = `skills-images/` + this.file.name;
      const fileRef = firebase.storage().ref(filePath);
      const task = firebase.storage().ref(filePath).put(this.file);
      task.then(() => {
          fileRef
            .getDownloadURL()

            .then((res:any) => {
              resolve(res);
            })
            .catch((err:any) => {
              console.log(err);
            });
        });
    });
  }
}
