import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SearchResultItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
    exports: [SearchResultItemComponent]
})
export class SearchResultItemModule { }
