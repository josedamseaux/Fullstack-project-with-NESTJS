import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: "users"},
  {path: "users", component: UsersComponent},
  { path: 'addpayment/:id', component: PaymentComponent },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
