import { Component, OnInit } from '@angular/core';
import { MasterDataServiceService } from '../services/master-data-service.service';
import { Consumer } from '../models/consumer';
import { Resource } from '../models/Resource';
import { ResoCompServiceService } from '../services/reso-comp-service.service';
import { ConsumedResource } from '../models/ConsumedResource';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private _masterDataService: MasterDataServiceService, private _resoConsService: ResoCompServiceService, private spinner:NgxSpinnerService) {
    this.consumers = new Array<Consumer>();
    this.resources = new Array<Resource>();
    this.consumedResources = new Array<ConsumedResource>();
    this.consumerId ="00000000-0000-0000-0000-000000000000";
    this.resourceId ="00000000-0000-0000-0000-000000000000";
    this.withNoDropOfDate = false;
  }

  public consumers: Consumer[];
  public consumerId: string;
  public resources: Resource[];
  public resourceId: string;
  public consumedResources: ConsumedResource[];
  public withNoDropOfDate : Boolean;

  ngOnInit() {
    this.spinner.show();
    this.GetConsumers();
    this.GetResources();
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

  GetResources() {
    this._masterDataService.GetResources().subscribe(
      (data: Resource[]) => {
        this.resources = data.sort((itm1, itm2) => {
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

  FindHistory(): void {
    this.spinner.show();
    this._resoConsService.GetConsumedResources(this.resourceId, this.consumerId, this.withNoDropOfDate).subscribe(
      (data: ConsumedResource[]) => {
        this.consumedResources = data.sort((itm1, itm2)=>{
          if(itm2.PickUpDateTime > itm1.PickUpDateTime)
            return 1;
          else if (itm2.PickUpDateTime < itm1.PickUpDateTime)
            return -1;
          else
            return 0;
        });
        this.spinner.hide();
      },
      (error: any)=>{
        console.log(error);
        this.consumedResources = new Array<ConsumedResource>();
        this.spinner.hide();
      }
    );
  }
}
