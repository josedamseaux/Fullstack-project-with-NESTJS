import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { PayInterface } from '../interfaces/payinterface';
import { format, isThisMonth, parseISO } from 'date-fns';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  user: any = {};
  idToSearch: any;
  defaulter: boolean;
  upToDate = '';
  frutier: any;
  randomNumberforInt = Math.floor(Math.random() * 100000) + 1;

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
    })

    let aver: any[] = []

    this.dataService.getPayments().subscribe(resp => {
      resp.forEach(respett => {
        if (respett.customerId == this.idToSearch) {
          aver.push(respett)
        }
      })


      let arrayfortest = []

      for (let i = 0; i < aver.length; i++) {

        let year = parseInt(aver[i].payDate.slice(-4));
        let month = aver[i].payDate.match(/(?<=-)\w+(?=-)/g)[0];
        let monther = parseInt(month)

        let result = isThisMonth(new Date(year, monther, 0))
        arrayfortest.push(result)

        if (arrayfortest.includes(true)) {
          this.defaulter = false;
          this.upToDate = 'Member up to date';
        } else {
          this.defaulter = true;
          this.upToDate = 'Defaulter';
        }

      }

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
      confirmButtonColor: "#000000",
    })
    if (month) {
      Swal.fire(`Payment registered`)
      this.frutier = month
      let datePaid = new Date().getDate() + "-" + (this.frutier) + "-" + new Date().getFullYear();

      let newObject = {
        id: this.randomNumberforInt,
        payDate: datePaid,
        customerId: this.user.id
      }
      console.log(newObject)
      this.dataService.createPayment(newObject).subscribe(res => {
        console.log(res)
      })

    }
  }


  goBack() {
    this._location.back();
  }

}
