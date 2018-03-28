import { Component, OnInit, AfterViewInit, Input, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <div class = "tooltip" [attr.class]="'tooltip fade ' + class" [ngStyle]="{'left': x, 'top': y}">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">
        {{text}}
      </div>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements AfterViewInit, OnInit {
  @Input() text: string;
  @Input() parent: HTMLElement;
  @Input() location: string;
  class: string;
  el: HTMLElement;
  position: Position;
  x:number;
  y:number;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(){
    this.location ? this.location = this.location : this.location = "right"
    this.assignClass(this.location);
  }

  ngAfterViewInit(){
    this.el = this.elementRef.nativeElement.children[0];
    this.displayTip();
    this.cdr.detectChanges();
   }

  /*
  * Called after view initialized
  * Driver method to call other methods performing checks and calculations
  */
  displayTip(){
    // TODO: Calculate if off screen and if so, do not re-calculate;
    this.calculatePosition(this.location);
  }

  /*
  * @Input location as string
  * Checks location input and if valid, assigns corresponding class for styling
  */
  // TODO: Deprecate side and above tags

  private assignClass(location: string){
    if (location ==="right" || location === "side"){
      this.class = "right";
    } else if (location === "left"){
      this.class = "left";
    } else if (location === "top" || location === "above" ) {
      this.class = "top";
    } else if (location === "bottom") {
      this.class = "bottom";
    }
    else {
      console.log("Bad location for tooltip! Try 'top', 'bottom', 'right', or 'left'.")
    }
  }

  /*
  * @Input location as string
  * Calculates position on screen according to selected placement.
  */
   // TODO: Deprecate side and above tags
  private calculatePosition(location: string) {
    let x = -999;
    let y = -999;
    const offsetConst = 5;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let offsetY = window.pageYOffset;
    let scrollY = window.scrollY || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
    
    if (location === "right" || location === "side"){
      x = this.parent.getBoundingClientRect().left + (this.parent.offsetWidth + offsetConst);
      y = (this.parent.getBoundingClientRect().top + offsetY - scrollY) + (this.parent.offsetHeight / 2) - (this.el.offsetHeight / 2);
    } 
    else if (location === "left") {
      x = this.parent.getBoundingClientRect().right - (this.parent.offsetWidth + this.el.offsetWidth + offsetConst);
      y = (this.parent.getBoundingClientRect().top + offsetY - scrollY) + (this.parent.offsetHeight / 2) - (this.el.offsetHeight / 2);
    } 
    else if (location === "top" || location === "above"){
      x = this.parent.getBoundingClientRect().left + (this.parent.offsetWidth / 2) - (this.el.offsetWidth / 2);
      y = (this.parent.getBoundingClientRect().bottom + offsetY - scrollY) - (this.parent.offsetHeight + this.el.offsetHeight + offsetConst);
    }
    else if (location === "bottom") {
      x = this.parent.getBoundingClientRect().left + (this.parent.offsetWidth / 2) - (this.el.offsetWidth / 2);
      y = (this.parent.getBoundingClientRect().top + offsetY - scrollY) + (this.parent.offsetHeight + offsetConst);
    }
    this.assignCoords(x, y);
  }

  /*
  * @Input left as number
  * @Input top as number
  * Assigns coordinates to global instanced variables as strings assigned to the style rules.
  */
  private assignCoords(left: any, top:any) {
    this.x = (typeof left === 'number') ? left + 'px' : left;
    this.y = (typeof top === 'number') ? top + 'px' : top;
  }
}
