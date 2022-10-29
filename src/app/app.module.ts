import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AccountModalComponent } from './components/account-modal/account-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountModalComponent,
    FilterPipe    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
