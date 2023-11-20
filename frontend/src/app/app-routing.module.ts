import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminComponent } from './admin/admin.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { BookComponent } from './book/book.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { HistoryComponent } from './history/history.component';
import { LoansComponent } from './loans/loans.component';
import { LoginComponent } from './login/login.component';
import { ModeratorProfileComponent } from './moderator-profile/moderator-profile.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ReaderProfileComponent } from './reader-profile/reader-profile.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { StartComponent } from './start/start.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';

const routes: Routes = [

  {path: "", component: StartComponent},
  {path: "login", component: LoginComponent},
  {path: "reader", component: ReaderComponent},
  {path: "admin", component: AdminComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "moderator", component: ModeratorComponent},
  {path: "register", component: RegisterComponent},
  {path: "moderatorprofile", component: ModeratorProfileComponent},
  {path: "adminprofile", component: AdminProfileComponent},
  {path: "readerprofile", component: ReaderProfileComponent},
  {path: "search", component: SearchComponent},
  {path: "addbook", component: AddBookComponent},
  {path: "book", component: BookComponent},
  {path: "editUser", component: EditUsersComponent},
  {path: "loan", component: LoansComponent},
  {path: "loanhistory", component: HistoryComponent},
  {path: 'bookRequests', component: BookRequestsComponent},
  {path: 'userRequests', component: UserRequestsComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: '**', component: StartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
