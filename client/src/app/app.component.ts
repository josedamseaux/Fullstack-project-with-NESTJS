import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';

  isOn: boolean = false;
  currentRout: string;

  canShowNavBar$: Observable<boolean>;
  navigationEvents$: Observable<NavigationEnd>;



  constructor(public dataService: DataService, private activatedRoute: ActivatedRoute, public router: Router){
 
  }


  ngOnInit(){
    this.navigationEvents$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      // This one is not really needed but we're giving some hints to the typescript compiler
      map(event => event as NavigationEnd) 
    );

    // Here we define the stream of booleans that determine whether to show the component or not on your template.
    this.canShowNavBar$ = this.navigationEvents$.pipe(
      map(event => this.shouldShowNavBar(event.url))
      
    );
    // Because actually you check for the same conditions
      

  }

  shouldShowNavBar(url: string): boolean {
    // And here you should test against regular expressions:
   switch(true) {
      case url.includes('/addpayment'):
      
      // More cases where you should show the navBar
      console.log(url)
      
      return false;
      default: return true;
   }



}
}
