import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormService} from '../form'
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  oldImage: any;
  checkedVal: string='';

  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar) {

    firebase.firestore().collection('Skill_Categories').orderBy('created_at','desc')
    .onSnapshot(res=>{
      this.skillCategoryList=[]
      res.forEach(list=>{    
        this.skillCategoryList.push(list.data())
        console.log(this.skillCategoryList);
      
      })
    });

    firebase.firestore().collection('Skills')
    .orderBy('created_at', 'asc').onSnapshot(res=>{
      this.skillsList=[]
      res.forEach(list=>{
        console.log(list.data());
      let skill=list.data();
      skill.skill_category=this.getTypeString(skill.skill_category);

      this.skillsList.push(skill);
      console.log(this.skillsList);
      })

    })

   }
   getTypeString(id:any){

    for(let i=0;i<this.skillCategoryList.length;i++)
    {
      if(this.skillCategoryList[i].category_id===id)
      return this.skillCategoryList[i].title;
    }
  }

  //****************************************************************************************************************/
  //                                                       NgOnInit                                                 /
  //****************************************************************************************************************/

  skillCategoryList:any[] = [];
  skillsList:any[] = [];
  updateItemId:string;
  ngOnInit() {
   
  }

  //****************************************************************************************************************/
  //                                                  VERIABLE DECLARATION                                          /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
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

  CloseAddContainer() {
    this.AddContainer = false;
    this.Form.addSkill.reset();
    this.displayImage=null
  }

  OpenAddContainer() {
    this.AddContainer = true;
  }
  CloseUpdateContainer() {
    this.updateContainer = false;
  }
  openUpdateContainer() {
    this.updateContainer = true;
  }

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

  //****************************************************************************************************************/
  //                                                   REMOVE EQUIPMENTS DATA                                       /
  //****************************************************************************************************************/

  removeSkill(item) {

    if (confirm('Are you sure to delete this record?')) {
      firebase.storage()
        .refFromURL(item.image)
        .delete()
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log(error.message));

      firebase.firestore()
        .collection('Skills')
        .doc(item.skill_id)
        .delete()
        .then((Response) => {
          this.route.navigate(['Skills']);
          this.snackBar.open('Skill Deleted', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        });
    }
  
    
  }

  //****************************************************************************************************************/
  //                                                  UPDATE EQUIPMENTS DATA                                        /
  //****************************************************************************************************************/

  updateSkill(item ) {
    if (this.image == false) {
      this.updateWithFile(item);
    } else {
      item.image = this.oldImage;
      item.skill_id = this.updateItemId;
      console.log(item);
      this.update(item);
    }
    

  }

  UpdateSlecetedItem(item) {
    this.openUpdateContainer();
    this.CloseAddContainer();
    this.updateItemId = item.skill_id
    firebase.firestore()
    .collection('Skills')
    .doc(item.skill_id)
    .get()
    .then((response) => {
      let data:any = response.data();
      console.log(data);
      firebase.firestore().collection('skill_categories')
        .orderBy('date', 'asc').onSnapshot(res=>{
          res.forEach(list=>{
            if(list.data().category_id===data.skill_id){
              this.checkedVal=list.data().title
            }
          })

        })

      this.oldImage = data.image;
      this.Form.updateSkill.patchValue({
        skill_category: data.skill_category,
        list_of_string: data.list_of_string,
        description:data.description
      });
    });
  }


   //****************************************************************************************
  //   update Function  blog                                                            start  *
  //****************************************************************************************

  update(item) {
    console.log(item);
  
    firebase.firestore()
      .collection('Skills')
      .doc(this.updateItemId)
      .update(item)
      .then((response) => {
        this.route.navigate(['skills']);
        this.snackBar.open('Successfully update Skill', 'close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        // this.spinner = false;
        
        this.Form.updateSkill.reset();
        this.CloseUpdateContainer()
      });
  }


  //****************************************************************************************
  //   updateWithFile                                                      start  *
  //****************************************************************************************

  updateWithFile(item:any) {
    this.uploadFile().then((url) => {
      firebase.storage()
        .refFromURL(this.oldImage)
        .delete()
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log(error.message));

      item.image = url;
      item.skill_id = this.updateItemId;
      this.update(item);
      // console.log(blog);
    });
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
