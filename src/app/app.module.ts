import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './generic-table/dg-column/dg-column.component';
import { TableRowTemplateDirective } from './generic-table/directives/tableRowtemplate.directive';
import { TemplateDirective } from './generic-table/directives/template.directive';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { TestTableExampleComponent } from './test-table-example/test-table-example.component';
import { PagingComponent } from './generic-table/paging/paging.component';
import { UsersService } from './services/users.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule }  from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterComponent } from './generic-table/filter/search-filter/search-filter.component';
import { DateFilterComponent } from './generic-table/filter/date-filter/date-filter.component';
import { LayoutComponent } from './layout/layout.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    TestTableExampleComponent,
    GenericTableComponent,
    ColumnComponent,
    TemplateDirective,
    TableRowTemplateDirective,
    PagingComponent,
    SearchFilterComponent,
    DateFilterComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    // MatMomentDateModule,
    MatNativeDateModule

  ],
  exports: [
    MatInputModule
  ],
  providers: [UsersService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
