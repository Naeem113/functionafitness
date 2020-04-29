import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { equipment } from './Models/EquipmentModel';
import { quotes } from './Models/QuotesModel';
import { exercises } from './Models/ExercisesModel';
import { levels } from './Models/LevelsModel';
import { bodyparts } from './Models/BodypartsModel';
import { goals } from './Models/GoalsModel';
import { workouts } from './Models/WorkoutsModel';
import { posts } from './Models/PostsModel';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  //****************************************************************************************************************/
  //                                                      CONSTRUCTOR                                               /
  //****************************************************************************************************************/

  constructor(
    private router: Router,
    private afauth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.EquipmentCollection = this.db.collection('Equipments');
    this.QuotesCollection = this.db.collection('Quotes');
    this.ExericsesCollection = this.db.collection('Exercises');
    this.LevelsCollection = this.db.collection('Levels');
    this.BodypartsCollection = this.db.collection('Bodyparts');
    this.GoalsCollection = this.db.collection('Goals');
    this.WorkoutsCollection = this.db.collection('Workouts');
    this.PostsCollection = this.db.collection('Posts');

    this.GetEquipmentData();
    this.GetQuotesData();
    this.GetExercisesData();
    this.GetLevelsData();
    this.GetBodyPartsData();
    this.GetGoalsData();
    this.GetWorkoutsData();
    this.GetPostsData();
  }

  //****************************************************************************************************************/
  //                                                  VERIABLE DECLARATION                                          /
  //****************************************************************************************************************/

  Equipments: Observable<equipment[]>;
  EquipmentCollection: AngularFirestoreCollection<equipment>;

  Quotes: Observable<quotes[]>;
  QuotesCollection: AngularFirestoreCollection<quotes>;

  Posts: Observable<posts[]>;
  PostsCollection: AngularFirestoreCollection<posts>;

  Workouts: Observable<workouts[]>;
  WorkoutsCollection: AngularFirestoreCollection<workouts>;

  Goals: Observable<goals[]>;
  GoalsCollection: AngularFirestoreCollection<goals>;

  Bodyparts: Observable<bodyparts[]>;
  BodypartsCollection: AngularFirestoreCollection<bodyparts>;

  Levels: Observable<levels[]>;
  LevelsCollection: AngularFirestoreCollection<levels>;

  Exercises: Observable<exercises[]>;
  ExericsesCollection: AngularFirestoreCollection<exercises>;

  //****************************************************************************************************************/
  //                                              USER AUTHENTICATION FUNCTION                                      /
  //****************************************************************************************************************/

  isathenticate() {
    this.afauth.authState.subscribe((user) => {
      if (user !== null) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  //****************************************************************************************************************/
  //                                       FUNCTIONS FOR GETTING DATA FROM FIREBASE                                  /
  //****************************************************************************************************************/

  //****************************************************************************************************************/
  //                                          FUNCTION FOR GET EQUIPMENTS DATA                                      /
  //****************************************************************************************************************/

  GetEquipmentData() {
    this.Equipments = this.EquipmentCollection.snapshotChanges().map(
      (docArray) => {
        return docArray.map((doc) => {
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as equipment),
          };
        });
      }
    );
  }

  //****************************************************************************************************************/
  //                                             FUNCTION FOR GET QUOTES DATA                                       /
  //****************************************************************************************************************/

  GetQuotesData() {
    this.Quotes = this.QuotesCollection.snapshotChanges().map((docArray) => {
      return docArray.map((doc) => {
        return {
          id: doc.payload.doc.id,
          ...(doc.payload.doc.data() as quotes),
        };
      });
    });
  }

  //****************************************************************************************************************/
  //                                         FUNCTION FOR GET EXERCISES DATA                                        /
  //****************************************************************************************************************/

  GetExercisesData() {
    this.Exercises = this.ExericsesCollection.snapshotChanges().map(
      (docArray) => {
        return docArray.map((doc) => {
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as exercises),
          };
        });
      }
    );
  }

  //****************************************************************************************************************/
  //                                          FUNCTION FOR GET LEVELS DATA                                          /
  //****************************************************************************************************************/

  GetLevelsData() {
    this.Levels = this.LevelsCollection.snapshotChanges().map((docArray) => {
      return docArray.map((doc) => {
        return {
          id: doc.payload.doc.id,
          ...(doc.payload.doc.data() as levels),
        };
      });
    });
  }

  //****************************************************************************************************************/
  //                                          FUNCTION FOR GET BODYPARTS DATA                                       /
  //****************************************************************************************************************/

  GetBodyPartsData() {
    this.Bodyparts = this.BodypartsCollection.snapshotChanges().map(
      (docArray) => {
        return docArray.map((doc) => {
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as bodyparts),
          };
        });
      }
    );
  }

  //****************************************************************************************************************/
  //                                             FUNCTION FOR GET GOALS DATA                                        /
  //****************************************************************************************************************/

  GetGoalsData() {
    this.Goals = this.GoalsCollection.snapshotChanges().map((docArray) => {
      return docArray.map((doc) => {
        return {
          id: doc.payload.doc.id,
          ...(doc.payload.doc.data() as goals),
        };
      });
    });
  }

  //****************************************************************************************************************/
  //                                           FUNCTION FOR GET WORKOUTS DATA                                      /
  //****************************************************************************************************************/

  GetWorkoutsData() {
    this.Workouts = this.WorkoutsCollection.snapshotChanges().map(
      (docArray) => {
        return docArray.map((doc) => {
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as workouts),
          };
        });
      }
    );
  }

  //****************************************************************************************************************/
  //                                              FUNCTION FOR GET POSTS DATA                                       /
  //****************************************************************************************************************/

  GetPostsData() {
    this.Posts = this.PostsCollection.snapshotChanges().map((docArray) => {
      return docArray.map((doc) => {
        return {
          id: doc.payload.doc.id,
          ...(doc.payload.doc.data() as posts),
        };
      });
    });
  }

  //****************************************************************************************************************/
  //                                      FUNCTION FOR ADD ALL COMPONENTS DATA                                      /
  //****************************************************************************************************************/

  addData(data, collection) {
    collection
      .add(data)
      .then((res) => {
        let success = 'Equipment Add Successfully...';
        this.showNotification('top', 'right', success);
      })
      .catch((err) => {
        console.log(err);
        let failed = 'Sorry: Submition failed...';
        this.showNotification('top', 'right', failed);
      });
  }

  //****************************************************************************************************************/
  //                                        FUNCTION FOR DELETE ALL COMPONENTS DATA                                 /
  //****************************************************************************************************************/

  deleteData(item, collection) {
    collection
      .doc(item.id)
      .delete()
      .then((res) => {
        let success = 'Equipment deleted Successfully...';
        this.showNotification('top', 'right', success);
      })
      .catch((err) => {
        console.log(err);
        let failed = 'Sorry: Deletion failed...';
        this.showNotification('top', 'right', failed);
      });
  }

  //****************************************************************************************************************/
  //                                       FUNCTION FOR UPDATE ALL COMPONENTS DATA                                  /
  //****************************************************************************************************************/

  updateData(item, collection) {
    collection
      .doc(item.id)
      .update(item)
      .then((res) => {
        let success = 'Equipment updated Successfully...';
        this.showNotification('top', 'right', success);
      })
      .catch((err) => {
        console.log(err);
        let failed = 'Sorry: updation failed...';
        this.showNotification('top', 'right', failed);
      });
  }

  //****************************************************************************************************************/
  //                                              ALERT NOTIFICATION FUNCTION                                      /
  //****************************************************************************************************************/

  showNotification(from, align, message) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: 'edit',
        message: message,
      },
      {
        type: type[color],
        timer: 200,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>',
      }
    );
  }
}
