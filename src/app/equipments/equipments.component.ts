import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'app/dataService.service';
import { Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { equipment } from '../Models/EquipmentModel';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css'],
})
export class EquipmentsComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                        CONSTRUCTOR                                             /
  //****************************************************************************************************************/

  constructor(
    private ServiceData: LayoutService,
    private db: AngularFirestore
  ) {
    this.EquipmentCollection = this.db.collection('Equipments');
  }

  //****************************************************************************************************************/
  //                                                          ngOnInIt                                              /
  //****************************************************************************************************************/

  ngOnInit() {
    this.EquipmentSubscription = this.ServiceData.Equipments.subscribe(
      (res) => {
        this.Equipment = res;
      }
    );
  }

  //****************************************************************************************************************/
  //                                                    VARIABLES DECLARATION                                       /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
  updateitem: equipment;
  Lastupdate: Date;
  Equipment: equipment[] = [];
  EquipmentSubscription: Subscription;
  EquipmentCollection: AngularFirestoreCollection<equipment>;

  //****************************************************************************************************************/
  //                                                     ng IF DIV FUNCTIONS                                        /
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
  //                                                ADD EQUIPMENTS DATA FUNCTION                                    /
  //****************************************************************************************************************/

  addEquipments(data: NgForm) {
    this.Lastupdate = new Date();
    data.value['lastupdate'] = new Date();
    this.ServiceData.addData(data.value, this.EquipmentCollection);
    data.reset();
  }

  //****************************************************************************************************************/
  //                                               DELETE EQUIPMENTS DATA FUNCTION                                  /
  //****************************************************************************************************************/

  RemoveEquipment(item) {
    this.ServiceData.deleteData(item, this.EquipmentCollection);
  }

  //****************************************************************************************************************/
  //                                                UPDATE EQUIPMENTS DATA FUNCTION                                 /
  //****************************************************************************************************************/

  updateEquipment(item: NgForm) {
    item.value['id'] = this.updateitem.id;
    this.ServiceData.updateData(item.value, this.EquipmentCollection);
    this.updateContainer = false;
  }

  UpdateSlecetedItem(item) {
    this.updateContainer = true;
    this.updateitem = item;
  }

  //****************************************************************************************************************/
  //                                                         ngOnDestroy                                            /
  //****************************************************************************************************************/

  ngOnDestroy(): void {
    this.EquipmentSubscription.unsubscribe();
  }
}
