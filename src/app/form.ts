import { Injectable } from '@angular/core';

import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormService {
  //**************************************************************
  //                      admin login form                 start *
  //**************************************************************

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  adminProfile: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [
      Validators.required,

    ]),
  });

  addJournal: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });
  updateJournal: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });


  addSkillCategory: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });
  updateSkillCategory: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  addSkill: FormGroup = new FormGroup({
    image: new FormControl('', Validators.required),
    skill_category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    list_of_string:new FormControl('', Validators.required),

  });
  updateSkill: FormGroup = new FormGroup({
    image: new FormControl(''),
    skill_category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    list_of_string:new FormControl('', Validators.required),
  });


}
