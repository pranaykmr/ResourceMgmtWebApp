import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { MasterDataComponent } from './admin/master-data.component';
import { TakeResourceComponent } from './normal/take-resource.component';
import { HistoryComponent } from './admin/history.component';
import { LoginComponent } from './login.component';
import { WorkspaceComponent } from './workspace.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    MasterDataComponent,
    TakeResourceComponent,
    HistoryComponent,
    LoginComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
