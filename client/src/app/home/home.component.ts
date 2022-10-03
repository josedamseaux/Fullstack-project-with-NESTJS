import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { combineLatest, concat, concatMap, flatMap, forkJoin, map, mergeMap, Observable, of, Subscriber, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/usersinterface';
import { DataService } from '../services/data.service';

import { PaymentInterface } from '../interfaces/paymentsinterface';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersToShow: any;
  addPaymentModeActivated = false;
  upToDate = '';

  payments: PaymentInterface = {
    id: 0,
    payDate: '',
    customerId: 0,
    firstName: '',
    lastName: ''
  }

  idForSearch: number;

  date = new Date();
  currentDate = this.date.getDate() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getFullYear();
  currentMonth = this.date.getMonth() + 1


  displayedColumns = ['id', 'firstName', 'lastName', 'dni', 'affiliateType', 'startDate', 'phoneNumber'];

  public dataSource = new MatTableDataSource<any[]>();



  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onClickAddPayment() {
    if (this.addPaymentModeActivated == false) {
      this.addPaymentModeActivated = true;
    } else {
      this.addPaymentModeActivated = false;
    }
  }

  searchUser(id: number) {

    this.dataService.getUsers().subscribe((resp) => {
      resp.forEach(resp2 => {
        if (resp2.dni == id) {
          this.idForSearch = resp2.id
          this.dataService.getOneUser(resp2.id).subscribe((resp) => {
            let objectted2 = JSON.stringify(resp)
            let objected = JSON.parse(objectted2)
            this.usersToShow = objected;

            this.dataService.getPayments().subscribe(resp => {
              resp.forEach(respett => {
                if (respett.customerId == this.usersToShow.id) {

                  let payments3 = {
                    id: respett.id,
                    payDate: respett.payDate,
                    customerId: respett.customerId,
                    firstName: respett.firstName,
                    lastName: respett.lastName
                  }

                  this.payments = payments3
                  let getMonthPaidReady = parseInt(respett.payDate.substring(this.payments.payDate.indexOf("-") + 1).slice(0, -5))

                  if (getMonthPaidReady == this.currentMonth) {
                    this.upToDate = "<h1 style='color:green'>" + 'Up to date' + "</h1>"

                  } else if (this.currentMonth > getMonthPaidReady) {
                    this.upToDate = "<h1 style='color:red'>" + 'Defaulter' + "</h1>"
                  }
                }

                Swal.fire({
                  title: this.usersToShow.firstName + ' ' + this.usersToShow.lastName,
                  html: this.usersToShow.affiliateType + ` <br> Last pay date:   ${this.payments.payDate} <br>` + this.upToDate,
                  confirmButtonText: 'Add payment',
                  confirmButtonColor: "#000000",
                }).then((result) => {
                  if (result.value === true) {
                    this.onClickAddPayment();
                  }
                });
              })
            })
          })
        }
      })
    });

  }

  isUpToDate(currentMonth: number, monthPaid: number){



  }





}
