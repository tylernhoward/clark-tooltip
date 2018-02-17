import { Directive, ComponentFactoryResolver, ViewContainerRef, Input, HostListener, ComponentRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tip]'
})
export class TipDirective {
  @Input('tip') text: string;
  @Input() tipLocation: string;

  parent: HTMLElement;
  tooltip: ComponentRef<TooltipComponent>;
  isShown: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {
          this.parent = this.viewContainerRef.element.nativeElement;
  }
  
  /*
  * Method triggered on hover
  * Builds tooltip component from a component factory and sets inputs to component
  */
  @HostListener("mouseenter")
  showTip(){
    //TODO: Include checks with isShown variable
    this.isShown = true;
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
  @HostListener("mouseleave")
  hideTip(){
    //TODO: Include checks with isShown variable
    this.isShown = false;
    this.tooltip.destroy();
  }
}