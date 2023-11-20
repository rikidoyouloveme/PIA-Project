import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReaderComponent } from './reader/reader.component';
import { AdminComponent } from './admin/admin.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StartComponent } from './start/start.component';
import { ReaderProfileComponent } from './reader-profile/reader-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ModeratorProfileComponent } from './moderator-profile/moderator-profile.component';
import { SearchComponent } from './search/search.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookComponent } from './book/book.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { LoansComponent } from './loans/loans.component';
import { HistoryComponent } from './history/history.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxChartsModule } from '@swimlane/ngx-charts'

@NgModule({
  declarations: [
    AppComponent,
    ReaderComponent,
    AdminComponent,
    ModeratorComponent,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
    StartComponent,
    ReaderProfileComponent,
    AdminProfileComponent,
    ModeratorProfileComponent,
    SearchComponent,
    AddBookComponent,
    BookComponent,
    EditUsersComponent,
    LoansComponent,
    HistoryComponent,
    BookRequestsComponent,
    UserRequestsComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatRadioModule,
    MatSliderModule,
    MatTableModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
