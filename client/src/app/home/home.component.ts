import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/usersinterface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersToShow: User[] = [];
  usersConverted: any;

  constructor(private dataService: DataService) { }
  ngOnInit(): void {
  }


}
