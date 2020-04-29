import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'app/dataService.service';
import { Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { posts } from 'app/Models/PostsModel';
import { goals } from 'app/Models/GoalsModel';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                         CONSTRUCTOR                                            /
  //****************************************************************************************************************/

  constructor(
    private ServiceData: LayoutService,
    private db: AngularFirestore
  ) {
    this.GoalsCollection = this.db.collection('Goals');
  }

  //****************************************************************************************************************/
  //                                                          ngOnInIt                                              /
  //****************************************************************************************************************/

  ngOnInit() {
    this.GoalsSubscription = this.ServiceData.Goals.subscribe((res) => {
      this.Goals = res;
    });
  }

  //****************************************************************************************************************/
  //                                                   VARIABLES DECLARATION                                        /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
  updateitem: goals;
  Goals: goals[] = [];
  GoalsSubscription: Subscription;
  GoalsCollection: AngularFirestoreCollection<goals>;

  //****************************************************************************************************************/
  //                                                   ng IF Div FUNCTIONS                                          /
  //****************************************************************************************************************/

  CloseAddContainer() {
    this.AddContainer = false;
  }

  OpenAddContainer() {
    this.AddContainer = true;
  }
  CloseUpdateContainer() {
    this.updateContainer = false;
  }

  //****************************************************************************************************************/
  //                                                  ADD GOALS DATA FUNCTION                                       /
  //****************************************************************************************************************/

  addGoal(data: NgForm) {
    this.ServiceData.addData(data.value, this.GoalsCollection);
    data.reset();
  }

  //****************************************************************************************************************/
  //                                                 REMOVE GOALS DATA FUNCTION                                     /
  //****************************************************************************************************************/

  RemoveGoal(item) {
    this.ServiceData.deleteData(item, this.GoalsCollection);
  }

  //****************************************************************************************************************/
  //                                                  UPDATE GOALS DATA FUNCTION                                    /
  //****************************************************************************************************************/

  updateGoal(item: NgForm) {
    item.value['id'] = this.updateitem.id;
    this.ServiceData.updateData(item.value, this.GoalsCollection);
    this.updateContainer = false;
  }

  UpdateSlecetedItem(item) {
    this.updateContainer = true;
    this.updateitem = item;
  }

  //****************************************************************************************************************/
  //                                                       ngOnDestroy                                              /
  //****************************************************************************************************************/

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.GoalsSubscription.unsubscribe();
  }
}
