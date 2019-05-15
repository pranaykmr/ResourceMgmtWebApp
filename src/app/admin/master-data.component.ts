import { Component, OnInit } from '@angular/core';
import { resolveComponentResources } from '@angular/core/src/metadata/resource_loading';
import { Consumer } from '../models/consumer';
import { Resource } from '../models/Resource';
import { MasterDataServiceService } from '../services/master-data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css'],
  providers: [MasterDataServiceService]
})
export class MasterDataComponent implements OnInit {
  constructor(private _masterDataService: MasterDataServiceService, private spinner : NgxSpinnerService) {
    this.resources = new Array<Resource>();
    this.consumers = new Array<Consumer>();
    
    this.currentResource = new Resource();
    this.currentConsumer = new Consumer();
   }

  public resources : Resource[];
  public consumers : Consumer[];
  
  public currentResource : Resource;
  public currentConsumer : Consumer;  

  ngOnInit() {
    this.spinner.show();
    this.GetResources();
    this.GetConsumers();    
  }

  GetResources(){
    this._masterDataService.GetResources().subscribe(
      (data: Resource[]) => {
        this.resources = data.sort((itm1, itm2)=>{
          if(itm1.Name > itm2.Name)
            return 1;
          else if(itm1.Name < itm2.Name)
            return -1;
          else
            return 0;
        });
        this.spinner.hide();
      },
      (error: any)=>{
        this.spinner.hide();
        console.log(error);
      }
    );
  }
 
  EditResource(res: Resource){
    this.currentResource = res;
  }

  DeleteResource(id: string){
    this.spinner.show();
    this._masterDataService.DeleteResource(id).subscribe(
      (data)=> {
          this.currentResource = new Resource();
          this.spinner.hide();
          alert('Resource deleted');
          this.GetResources();
      },
      (error: any) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
  
  SaveResource() : void {
    let currRes = Object.assign({}, this.currentResource);
    this.spinner.show();
    if(currRes.Id == "00000000-0000-0000-0000-000000000000")//To check if it is new
    {
      this._masterDataService.InsertResource(currRes).subscribe(
        (data) => {
          this.currentResource = new Resource();
          this.spinner.hide();
          alert('Resource inserted');
          this.GetResources();
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
        }
      );      
    }
    else
    {
      this._masterDataService.UpdateResource(currRes).subscribe(
        (data) => {
          this.spinner.hide();
          this.currentResource = new Resource();
          alert('Resource updated');
          this.GetResources();
        },
        (error: any) => {
          this.spinner.hide();
          console.log(error);
        }
      );
    }    
  }


  GetConsumers(){
    this._masterDataService.GetConsumers().subscribe(
      (data: Consumer[]) => {
        this.consumers = data.sort((itm1, itm2)=>{
          if(itm1.Name > itm2.Name)
            return 1;
          else if(itm1.Name < itm2.Name)
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

  EditConsumer(cons: Consumer){
    this.currentConsumer = cons;
  }

  DeleteConsumer(id: string){
    this.spinner.show();
    this._masterDataService.DeleteConsumer(id).subscribe(
      (data)=> {
        this.currentConsumer = new Consumer();
        this.spinner.hide();
          alert('Consumer deleted');
          this.GetConsumers();
      },
      (error: any) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  SaveConsumer() : void {
    this.spinner.show();
    let currCons = Object.assign({}, this.currentConsumer);
    if(currCons.Id == "00000000-0000-0000-0000-000000000000")//To check if it is new
    {
      this._masterDataService.InsertConsumer(currCons).subscribe(
        (data) => {
          this.spinner.hide();
          this.currentConsumer = new Consumer();
          alert('Consumer inserted');
          this.GetConsumers();
        },
        (error: any) => {
          this.spinner.hide();
          console.log(error);
        }
      );      
    }
    else
    {
      this._masterDataService.UpdateConsumer(currCons).subscribe(
        (data) => {
          this.currentConsumer = new Consumer();
          this.spinner.hide();
          alert('Consumer updated');
          this.GetConsumers();
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
        }
      );
    }    
  }

}
