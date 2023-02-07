import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { User } from '../interfaces/usersinterface';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, map, Subject, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { isThisMonth } from 'date-fns';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // MATERIAL ELEMENTS ***************

  displayedColumns = ['id', 'firstName', 'lastName', 'dni', 'affiliateType', 'startDate', 'phoneNumber', 'actions', 'upToDate'];

  public dataSource = new MatTableDataSource<any[]>();

  selects = [
    { affiliateType: 'GOLD', value: 'GOLD' },
    { affiliateType: 'PLATINUM', value: 'PLATINUM' },
    { affiliateType: 'BLACK', value: 'BLACK' }
  ];

  private OnDestroy$ = new Subject();
  editUserModeActivated: boolean = false;
  addUserModeActivated: boolean = false;
  searchUser$ = new Subject<string>();

  listFiltered: any[] = [''];
  test: number | undefined;
  value = '';
  idForDate: any[] = []

  currentMonth = new Date().getMonth() + 1

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    dni: 0,
    affiliateType: '',
    startDate: '',
    phoneNumber: '',
    emailAdress: ''
  }

  userSelected2 = {
    firstName: '',
    lastName: '',
    dni: 0,
    affiliateType: '',
    startDate: '',
    phoneNumber: '',
    emailAdress: ''
  }

  f: FormControl;

  constructor(private dataService: DataService, public router: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.filterList();
  }

  cancelEdit() {
    this.editUserModeActivated = false;
    this.onClick();
    this.dataService.updateApprovalMessage(true)
  }

  onClick() {
    if (this.addUserModeActivated == false) {
      this.addUserModeActivated = true;
    } else {
      this.addUserModeActivated = false;
    }
  }

  goToPaymentSection() {
    this.router.navigateByUrl('addpayment/:id')
  }

  hasNumber(string: any) {
    return /\d/.test(string);
  }

  cleanForm(object: any) {
    Object.keys(object).forEach(key => delete object[key]);
    delete this.test;
  }

  filterList() {
    this.searchUser$.pipe(
      debounceTime(400), distinctUntilChanged()).subscribe(term => {
        this.dataSource.data = this.listFiltered
          .filter(item => item.firstName.toLowerCase().indexOf(term.toLowerCase()) >= 0 ||
            item.lastName.toLowerCase().indexOf(term.toLowerCase()) >= 0);
        if (this.hasNumber(term) == true) {
          this.dataSource.data = this.listFiltered
            .filter(item => item.dni.toString().toLowerCase().indexOf(term.toLowerCase()) >= 0);
        }
      });
  }

  getUsers() {

    this.dataService.getUsers().subscribe(resp => {
      this.dataSource.data = resp
      this.listFiltered = resp
    })

    let aver: any[] = []

    this.dataService.getPayments().subscribe(resp => {
      resp.forEach(respett => {
        let getMonthPaidReady = parseInt(respett.payDate.substring(respett.payDate.indexOf("-") + 1).slice(0, -5))
        let year = parseInt(respett.payDate.slice(-4));
        let result = isThisMonth(new Date(year, getMonthPaidReady, 0))
        if (result == true) {
          this.idForDate.push(respett.customerId)
          console.log(aver)
        }
      })
    })

  }

  viewUser(user: User) {
    this.addUserModeActivated = false;
    let userSelected = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      dni: user.dni,
      affiliateType: user.affiliateType,
      startDate: user.startDate,
      phoneNumber: user.phoneNumber,
      emailAdress: user.emailAdress
    }
    this.test = user.dni;
    this.user = userSelected;
    this.userSelected2 = user;

    Swal.fire({
      title: userSelected.firstName + ' ' + userSelected.lastName,
      html: `${userSelected.affiliateType} <br> Start date:   ${userSelected.startDate} <br> DNI: ${userSelected.dni}`,
      confirmButtonText: 'Edit user',
      showDenyButton: true,
      denyButtonText: `Delete user`,
      confirmButtonColor: "#000000",
      denyButtonColor: "#000000",


    }).then((result) => {
      if (result.value === true) {
        this.addUserModeActivated = true;
        this.editUserModeActivated = true;
        this.dataService.updateApprovalMessage(false)
      } else if (result.isDenied) {
        this.deleteUser(user.id);
      } else if (result.isDismissed) {
        this.cleanForm(userSelected);
        this.dataService.updateApprovalMessage(true)
      }
    })
  }

  createUser(f: any) {
    let date = new Date();
    let currentDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    f.value.startDate = currentDate;
    this.dataService.createContact(f.value).subscribe((result) => {
      this.getUsers();
      this.addUserModeActivated = false
    });
    Swal.fire({
      confirmButtonText: 'Ok',
      confirmButtonColor: "#000000",
      title: 'Succes!',
      timer: 3000,
      text: 'User has been succesfully saved',
      icon: 'success',
    })
  }


  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isDenied) {
        this.dataService.deleteContact(id).subscribe(() => {
          this.getUsers();
          this.cleanForm(this.user);
        });
        Swal.fire({
          title: 'Succesfully removed',
          timer: 2500,
          text: 'User has been succesfully removed',
          icon: 'info',
        })
      } else if (result.isDismissed) {
        this.cleanForm(this.user);
        this.user.id = 0
      }
    })
  }


  updateUser(f: NgForm) {
    f.value.id = this.user['id']
    let compareDataFirstName = this.user.firstName.toLowerCase();
    let compareDataFirstName2 = this.userSelected2.firstName.toLocaleLowerCase();
    let compareDataLastName = this.user.lastName.toLowerCase();
    let compareDataLastName2 = this.userSelected2.lastName.toLocaleLowerCase();
    let compareDataEmailAdress = this.user.emailAdress.toLowerCase();
    let compareDataEmailAdress2 = this.userSelected2.emailAdress.toLocaleLowerCase();

    if (compareDataFirstName != compareDataFirstName2 ||
      compareDataLastName != compareDataLastName2 ||
      this.test != this.userSelected2.dni ||
      this.user.affiliateType != this.userSelected2.affiliateType ||
      this.user.phoneNumber != this.userSelected2.phoneNumber ||
      compareDataEmailAdress != compareDataEmailAdress2) {
      this.dataService.updateContact(f.value).subscribe(() => {
        this.getUsers()
      });
      Swal.fire({
        title: 'User succesfully updated',
        icon: 'success',
        timer: 2000,

      })
      this.cancelEdit();
    } else {
      this.cancelEdit();
    }
  }

  ngOnDestroy(): void {
    this.OnDestroy$.next;
  }


}
