import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'app/dataService.service';
import { Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { bodyparts } from 'app/Models/BodypartsModel';

@Component({
  selector: 'app-bodyparts',
  templateUrl: './bodyparts.component.html',
  styleUrls: ['./bodyparts.component.css'],
})
export class BodypartsComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                         CONSTRUCTOR                                            /
  //****************************************************************************************************************/

  constructor(
    private ServiceData: LayoutService,
    private db: AngularFirestore
  ) {
    this.BodyparstCollection = this.db.collection('Bodyparts');
  }

  //****************************************************************************************************************/
  //                                                         ngOnInIt                                               /
  //****************************************************************************************************************/

  ngOnInit() {
    this.BodypartsSubscription = this.ServiceData.Bodyparts.subscribe((res) => {
      this.Bodyparts = res;
    });
  }

  //****************************************************************************************************************/
  //                                                   VARIABLES DECLARATION                                        /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
  updateitem: bodyparts;
  Bodyparts: bodyparts[] = [];
  BodypartsSubscription: Subscription;
  BodyparstCollection: AngularFirestoreCollection<bodyparts>;

  //****************************************************************************************************************/
  //                                                    ng IF DIV FUNCTION                                          /
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
  //                                                 ADD BODYPARTS DATA FUNCTION                                    /
  //****************************************************************************************************************/

  addBodyparts(data: NgForm) {
    this.ServiceData.addData(data.value, this.BodyparstCollection);
    data.reset();
  }

  //****************************************************************************************************************/
  //                                               DELETE BODYPARTS DATA FUNCTION                                   /
  //****************************************************************************************************************/

  RemoveBodyparts(item) {
    this.ServiceData.deleteData(item, this.BodyparstCollection);
  }

  //****************************************************************************************************************/
  //                                               UPDATE BODYPARTS DATA FUNCTION                                   /
  //****************************************************************************************************************/

  updateBodyparts(item: NgForm) {
    item.value['id'] = this.updateitem.id;
    this.ServiceData.updateData(item.value, this.BodyparstCollection);
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
    this.BodypartsSubscription.unsubscribe();
  }
}
