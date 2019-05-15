import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MasterDataServiceService } from './services/master-data-service.service';
import { Consumer } from './models/consumer';
import { SecurityService } from './services/security.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _securityService: SecurityService,  private spinner: NgxSpinnerService) {
    this.userId = "";
    this.pwd = "";
  }
  private userId: string;
  private pwd: string;
  private token: string;

  @Output()
  onTokenValuePopulate : EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }
  
  DoLogin() : void{
    this.spinner.show();
    this._securityService.DoLogin(this.userId, this.pwd).subscribe(
      (data: string)=>{
        this.token = data;
        this.onTokenValuePopulate.emit(data);
        this.spinner.hide();
      },
      (error: any)=>{
        console.log(error);
        this.spinner.hide();
      }
    );
  }

}
