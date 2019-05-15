import { Component, OnInit } from '@angular/core';
import { GrabResource } from '../models/GrabResource';
import { ResoCompServiceService } from '../services/reso-comp-service.service';
import { Resource } from '../models/Resource';
import { ConsumedResource } from '../models/ConsumedResource';
import { MasterDataServiceService } from '../services/master-data-service.service';
import { Consumer } from '../models/consumer';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-take-resource',
  templateUrl: './take-resource.component.html',
  styleUrls: ['./take-resource.component.css'],
  providers: [ResoCompServiceService]
})
export class TakeResourceComponent implements OnInit {

  constructor(private _resoConsService: ResoCompServiceService, private _masterDataService: MasterDataServiceService, private spinner: NgxSpinnerService) {
    this.takeResourceData = new GrabResource();
    this.selectedAvlbRes = new Array<Resource>();
    this.selectedCnsmdRes = new Array<ConsumedResource>();
    this.droppedCnsmdRes = new Array<ConsumedResource>();
    this.selectedUserCnsmdRes = new Array<ConsumedResource>();
    this.otherUsersCnsmdRes = new Array<ConsumedResource>();
    this.consumers = new Array<Consumer>();
    this.consumerId = "";
  }

  public takeResourceData: GrabResource;
  private selectedAvlbRes: Resource[];
  private selectedCnsmdRes: ConsumedResource[];
  private droppedCnsmdRes: ConsumedResource[];
  public selectedUserCnsmdRes: ConsumedResource[];
  public otherUsersCnsmdRes: ConsumedResource[];
  public consumers: Consumer[];
  public consumerId: string;

  ngOnInit() {
    this.spinner.show();
    this.GetConsumers();
  }

  GetConsumers() {
    this._masterDataService.GetConsumers().subscribe(
      (data: Consumer[]) => {
        this.consumers = data.sort((itm1, itm2) => {
          if (itm1.Name > itm2.Name)
            return 1;
          else if (itm1.Name < itm2.Name)
            return -1;
          else
            return 0;
        });
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  GetTakeResourceData() {
    this.spinner.show();
    this._resoConsService.GetDataToTakeResources().subscribe(
      (data: GrabResource) => {
        this.takeResourceData = data;
        this.takeResourceData.ConsumedResources.forEach((item) => {
          if (item.ConsumerId == this.consumerId) {
            this.selectedUserCnsmdRes.push(item);
          }
          else {
            this.otherUsersCnsmdRes.push(item);
          }
        });
        this.SortDisplaydata();
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  SortDisplaydata(): void {
    this.takeResourceData.AvailableResources = this.takeResourceData.AvailableResources.sort((itm1, itm2) => {
      if (itm1.Name > itm2.Name)
        return 1;
      else if (itm1.Name < itm2.Name)
        return -1;
      else
        return 0;
    });
    this.selectedUserCnsmdRes = this.selectedUserCnsmdRes.sort((itm1, itm2) => {
      if (itm1.ResourceName > itm2.ResourceName)
        return 1;
      else if (itm1.ResourceName < itm2.ResourceName)
        return -1;
      else
        return 0;
    });
    this.otherUsersCnsmdRes = this.otherUsersCnsmdRes.sort((itm1, itm2) => {
      if (itm1.ConsumerName > itm2.ConsumerName)
        return 1;
      else if (itm1.ConsumerName < itm2.ConsumerName)
        return -1;
      else
        return 0;
    });
  }

  OnConsumerChange() {
    this.selectedAvlbRes.splice(0, this.selectedAvlbRes.length);
    this.selectedCnsmdRes.splice(0, this.selectedCnsmdRes.length);
    this.droppedCnsmdRes.splice(0, this.droppedCnsmdRes.length);
    this.selectedUserCnsmdRes.splice(0, this.selectedUserCnsmdRes.length);
    this.otherUsersCnsmdRes.splice(0, this.otherUsersCnsmdRes.length);
    this.GetTakeResourceData();
  }

  //Inserts selected items in "selectedAvlbRes" list
  SelectAvailableResources(event, res: Resource) {
    var target = event.target || event.srcElement || event.currentTarget;
    var classAttr = target.attributes.class;
    if (classAttr.nodeValue == "list-group-item") {
      classAttr.nodeValue = "list-group-item active";
      this.selectedAvlbRes.push(res);
    }
    else {
      classAttr.nodeValue = "list-group-item";
      let itemIndex = this.selectedAvlbRes.indexOf(res);
      this.selectedAvlbRes.splice(itemIndex, 1);
    }
    event.preventDefault();
  }

  TakeResource() {
    //Inserting in right side (consumed resources) collection
    this.selectedAvlbRes.forEach((item) => {
      let cr: ConsumedResource = new ConsumedResource();
      cr.ResourceId = item.Id;
      cr.ResourceName = item.Name;
      cr.ConsumerId = this.consumerId;
      cr.ConsumerName = this.consumers.find(x => x.Id == this.consumerId).Name;
      //this.takeResourceData.ConsumedResources.push(cr);
      this.selectedUserCnsmdRes.push(cr);

      //Removing from left side (Available resources) collection
      let itemIndex = this.takeResourceData.AvailableResources.indexOf(item);
      this.takeResourceData.AvailableResources.splice(itemIndex, 1);
    });
    this.selectedAvlbRes.splice(0, this.selectedAvlbRes.length);
  }

  //////////////////////////////
  //Inserts selected items in "selectedCnsmdRes" list
  SelectConsumedResources(event, cRes: ConsumedResource) {
    var target = event.target || event.srcElement || event.currentTarget;
    var classAttr = target.attributes.class;
    if (classAttr.nodeValue == "list-group-item") {
      classAttr.nodeValue = "list-group-item active";
      this.selectedCnsmdRes.push(cRes);
    }
    else {
      classAttr.nodeValue = "list-group-item";
      let itemIndex = this.selectedCnsmdRes.indexOf(cRes);
      this.selectedCnsmdRes.splice(itemIndex, 1);
    }
  }

  DropResource() {
    //Inserting in left side (avilable resources) collection
    this.selectedCnsmdRes.forEach((item) => {
      let ar: Resource = new Resource();
      ar.Name = item.ResourceName;
      this.takeResourceData.AvailableResources.push(ar);

      if (item.Id != "00000000-0000-0000-0000-000000000000") {
        item.IsDropped = true;
        this.droppedCnsmdRes.push(item);
      }

      //Removing from right side (consumed resources) collection
      let itemIndex = this.selectedUserCnsmdRes.indexOf(item);
      this.selectedUserCnsmdRes.splice(itemIndex, 1);
    });
    this.selectedCnsmdRes.splice(0, this.selectedCnsmdRes.length);
  }

  SaveFinalizedResouces() {
    this.spinner.show();
    if (this.droppedCnsmdRes.length > 0 || this.selectedUserCnsmdRes.length > 0) {
      let finalCnsmdResources: ConsumedResource[];
      finalCnsmdResources = new Array<ConsumedResource>();
      finalCnsmdResources = finalCnsmdResources.concat(this.droppedCnsmdRes);
      finalCnsmdResources = finalCnsmdResources.concat(this.selectedUserCnsmdRes);

      this._resoConsService.SaveConsumedResources(finalCnsmdResources).subscribe(
        (data) => {
          this.spinner.hide();
          alert("Finalization saved");
          this.OnConsumerChange();
        },
        (error: any) => {
          this.spinner.hide();
          console.log(error);
        }
      );
    }
  }



}
