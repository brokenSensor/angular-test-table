import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { StoreModule } from '@ngrx/store';
import { tableReducer } from './table/table.reducer';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { NgbdSortableHeader } from './sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalFormComponent,
    NgbdSortableHeader,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot({ table: tableReducer }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
