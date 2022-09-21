import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { User } from '../interfaces/usersinterface';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // MATERIAL ELEMENTS ***************

  displayedColumns = ['id', 'firstName', 'lastName', 'dni', 'affiliateType', 'startDate', 'phoneNumber', 'actions'];

  public dataSource = new MatTableDataSource<any[]>();

  selects = [
    { affiliateType: 'GOLD', value: 'GOLD' },
    { affiliateType: 'PLATINUM', value: 'PLATINUM' },
    { affiliateType: 'BLACK', value: 'BLACK' }
  ];

  // MATERIAL ELEMENTS ***************

  private OnDestroy$ = new Subject();
  editUserModeActivated: boolean = false;
  addUserModeActivated: boolean = false;
  searchUser$ = new Subject<string>();


  listFiltered: any[] = [''];
  test: number | undefined;
  value = '';

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

  f: FormControl | undefined;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getUsers();
    this.filterList();
  }

  cancelEdit() {
    this.editUserModeActivated = false;
    this.onClick();
  }

  onClick() {
      if (this.addUserModeActivated == false) {
      this.addUserModeActivated = true;
      } else {
        this.addUserModeActivated = false;
      }
  }

  hasNumber(myString: any) {
    return /\d/.test(myString);
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
  };

  getUsers() {
    this.dataService.getUsers().subscribe(res => {
      this.dataSource.data = res;
      this.listFiltered = res;
    });
  }

  selectUser(user: User) {
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

    Swal.fire({
      title: userSelected.firstName + ' ' + userSelected.lastName,
      html:`${userSelected.affiliateType} <br> Start date:   ${userSelected.startDate} <br> DNI: ${userSelected.dni}`,
      confirmButtonText: 'Edit user',
      showDenyButton: true,
      denyButtonText: `Delete user`,
      confirmButtonColor: '#3399ff',

    }).then((result) => {
      if (result.value === true) {
        this.addUserModeActivated = true;
        this.editUserModeActivated = true;
      } else if (result.isDenied) {
        this.deleteUser(user.id);
      }else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  createUser(f: any) {
    let date = new Date();
    let currentDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    f.value.startDate = currentDate;

    this.dataService.createContact(f.value).subscribe((result) => {
      console.log(result);
      this.getUsers();
      this.addUserModeActivated = false
    });
    Swal.fire({
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
      showCancelButton: true,
      denyButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isDenied) {
        this.dataService.deleteContact(id).subscribe((result) => {
          this.getUsers();
        });
        Swal.fire({
          title: 'Succesfully removed',
          timer: 2500,
          text: 'User has been succesfully removed',
          icon: 'info',
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getUsers();
      }
    })
  }

  updateUser(f: NgForm) {
    f.value.id = this.user['id']

    if (f.dirty) {
      this.dataService.updateContact(f.value).subscribe((result) => {
      }).unsubscribe();
      Swal.fire({
        title: 'User succesfully updated',
        icon: 'success'
      })
      this.getUsers();
      this.cancelEdit();
    } else {
      this.cancelEdit();
    }
  }

  ngOnDestroy(): void {
    this.OnDestroy$.next;
  }


}
