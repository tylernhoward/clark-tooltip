import { Directive, ComponentFactoryResolver, ViewContainerRef, Input, HostListener, ComponentRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tip]'
})
export class TipDirective {
  @Input('tip') text: string;
  @Input() tipLocation: string;
  @Input() tipDelay: number;

  parent: HTMLElement;
  tooltip: ComponentRef<TooltipComponent>;
  isShown: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {
          this.parent = this.viewContainerRef.element.nativeElement;
          this.isShown = false;
          this.tipDelay ? this.tipDelay = this.tipDelay : this.tipDelay = 0;
  }
  
  /*
  * Method triggered on hover
  * Waits for delay and sets props to tip
  */
  @HostListener("mouseenter")
  showTip(){
    if(this.isShown === false){
      setTimeout(() => {
        this.isShown = true;
        this.setProps();
      }, this.tipDelay);
    }
  }
  /*
  * Helper Method
  * Builds tooltip component from a component factory and sets inputs to component
  */
  setProps(){
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.tooltip = this.viewContainerRef.createComponent(componentFactory);
    this.tooltip.instance.parent = this.parent;
    this.tooltip.instance.location = this.tipLocation;
    this.tooltip.instance.text = this.text;
  }


  /*
  * Method triggered on focus lost
  * Destroys instance of tooltip component
  */
  @HostListener("window:scroll", ['$event'])
  @HostListener("mouseleave")
  hideTip(event) {
    if (this.isShown === true) {
      this.isShown = false;
      this.tooltip.destroy();
    }
  }
}