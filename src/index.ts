import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { TipDirective } from './tip.directive';

export * from './tip.directive';
export * from './tooltip.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TooltipComponent,
    TipDirective
  ],
  exports: [
    TooltipComponent,
    TipDirective
  ],
  entryComponents : [
    TooltipComponent
  ]
})
export class TooltipModule { }