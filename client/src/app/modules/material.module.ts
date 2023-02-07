import { MatButtonModule } from  '@angular/material/button';
import { MatCardModule } from  '@angular/material/card';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatTableModule } from  '@angular/material/table';
import { MatInputModule } from  '@angular/material/input';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ ],
    imports: [
      MatTableModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule
    ],
    exports: [
      MatTableModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule
      ],
    providers: [],
    bootstrap: []
  })
  export class MaterialModule  { }