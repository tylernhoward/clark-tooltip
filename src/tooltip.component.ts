import { Component, OnInit, AfterViewInit, Input, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <div class = "tooltip" [attr.class]="'tooltip ' + class" [ngStyle]="{'left': x, 'top': y}">
      <p>{{text}}</p>
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
    this.location ? this.location = this.location : this.location = "side"
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
  private assignClass(location: string){
    if (location ==="side"){
      this.class = location;
    } else if (location === "above"){
      this.class = location;
    } else {
      console.log("Bad location for tooltip! Try 'above' or 'side'.")
    }
  }
  
  /*
  * @Input location as string
  * Calculates position on screen according to selected placement.
  */
  private calculatePosition(location: string) {
    let x = -999;
    let y = -999;
    const offsetConst = 10;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let scrollY = window.pageYOffset;
    
    if (location === "side"){
      x = this.parent.getBoundingClientRect().left + this.parent.offsetWidth + offsetConst;
      y = (this.parent.getBoundingClientRect().top + scrollY) + this.parent.offsetHeight / 2 - this.el.clientHeight / 2;
    } 
    // TODO: Need to correct offset in this math to display better
    else if (location === "above"){
      x = this.parent.getBoundingClientRect().left + this.parent.offsetWidth / 2 - this.el.clientWidth / 2;
      y = (this.parent.getBoundingClientRect().top + scrollY) - this.parent.offsetHeight - this.el.offsetHeight/2;
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
