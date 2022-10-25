import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { PayInterface } from '../interfaces/payinterface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  user: any = {};
  idToSearch: any;
  payments: any;
  defaulter: boolean;
  upToDate = '';
  currentMonth = new Date().getMonth() + 1;
  frutier: any;
  randomNumberforInt = Math.floor(Math.random() * 100000) + 1;
  currentPayment: any;
  payment: PayInterface = {
    id: 0,
    payDate: '',
   customerId: 0
  }

  constructor(private dataService: DataService, private _activatedRoute: ActivatedRoute, private _location: Location) {
    this._activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.idToSearch = params['id'];
    });
    console.log(this.randomNumberforInt)
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.dataService.getOneUser(this.idToSearch).subscribe(res => {
      this.user = res;
      console.log(this.user)
    })

    this.dataService.getPayments().subscribe(resp => {
      resp.forEach(respett => {
        this.currentPayment = respett.payDate
        if (respett.customerId == this.idToSearch) {
          console.log(respett)
          this.payments = respett.payDate;
          this.payment.customerId = respett.customerId
          let getMonthPaidReady = parseInt(respett.payDate.substring(respett.payDate.indexOf("-") + 1).slice(0, -5))
          if (getMonthPaidReady == this.currentMonth) {
            this.upToDate = 'Up to date'
            this.defaulter = false;
            console.log('uptodate')
            console.log(getMonthPaidReady)
          } else if (this.currentMonth > getMonthPaidReady) {
            this.upToDate = 'Defaulter'
            this.defaulter = true;
          }}
      })
    })
  }

  async pay() { 
    const { value: month } = await Swal.fire({
      title: 'Add payment for the month',
      input: 'select',
      inputOptions: {
          1: 'January',
          2: 'February',
          3: 'March',
          4: 'April',
          5: 'May',
          6: 'June',
          7: 'July',
          8: 'August',
          9: 'September',
          10: 'Octuber',
          11: 'November',
          12: 'December',
      inputPlaceholder: 'Select a month'
    },
    confirmButtonText: 'Add payment',
    confirmButtonColor: "#000000",})
    if (month) {
      Swal.fire(`Payment registered`)
      this.frutier = month
      // let date = new Date();
      let datePaid = new Date().getDate() + "-" + (this.frutier) + "-" + new Date().getFullYear();

      let newObject = {
        id: this.randomNumberforInt,
        payDate: datePaid,
        customerId: this.user.id
      }
      console.log(newObject)
      this.dataService.createPayment(newObject).subscribe(res=>{
        console.log(res)
      })
    
    }
  }


  goBack() {
    this._location.back();
  }

}
