import { MatButtonModule } from  '@angular/material/button';
import { MatCardModule } from  '@angular/material/card';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatTableModule } from  '@angular/material/table';
import { MatInputModule } from  '@angular/material/input';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [ ],
    imports: [
      MatTableModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatSelectModule
    ],
    exports: [
      MatTableModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatSelectModule
      ],
    providers: [],
    bootstrap: []
  })
  export class MaterialModule  { }