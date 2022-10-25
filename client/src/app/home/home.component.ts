import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { User } from '../interfaces/usersinterface';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

import { PaymentInterface } from '../interfaces/paymentsinterface';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hide: Observable<boolean>;
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
  nextMonth = this.date.getMonth() + 2
  nextPayDate:any

  _isBoolean$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  displayedColumns = ['id', 'firstName', 'lastName', 'dni', 'affiliateType', 'startDate', 'phoneNumber'];

  public dataSource = new MatTableDataSource<any[]>();

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.approvalStageMessage.subscribe(msg => {
      console.log(msg)
      if(msg == true){
        this._isBoolean$.next(true)
      } else {
        this._isBoolean$.next(false)
      }
    })
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
                  console.log(payments3)
                  this.payments = payments3
                  let getMonthPaidReady = parseInt(respett.payDate.substring(this.payments.payDate.indexOf("-") + 1).slice(0, -5))
                  let replacer = this.nextMonth.toString()
                  this.nextPayDate = this.payments.payDate.replace(getMonthPaidReady.toString(), replacer)
                  if (getMonthPaidReady == this.currentMonth) {
                    this.upToDate = "<h1 style='color:green'>" + 'Up to date' + "</h1>"
                  } else if (this.currentMonth > getMonthPaidReady) {
                    this.upToDate = "<h1 style='color:red'>" + 'Defaulter' + "</h1>"
                  }
                }

                Swal.fire({
                  title: this.usersToShow.firstName + ' ' + this.usersToShow.lastName,
                  html: this.usersToShow.affiliateType + ` <br> Last pay date:   ${this.payments.payDate} <br>` + this.upToDate +
                        ` <br> Next pay date:   ${this.nextPayDate} <br>`,
                  confirmButtonText: 'Add payment',
                  confirmButtonColor: "#000000",
                }).then((result) => {
                  if (result.value === true) {
                    this.router.navigateByUrl(`/addpayment/${this.idForSearch}`);

                    this.onClickAddPayment();
                  }
                })
              })
            })
          })
        }
      })
    })
  }






}
