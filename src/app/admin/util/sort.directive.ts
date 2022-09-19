import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Sort } from './sort'


@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any> | undefined;
  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener("click")
  sortData() {
    // Create Object of Sort Class
    const sort = new Sort();
    // Get Reference Of Current Clicked Element
    const elem = this.targetElem.nativeElement;
    // Get In Which Order list should be sorted. By default, it should be set to desc on element attribute
    const order = elem.getAttribute("data-order");
    // Get The Property Type specially set [data-type=date] if it is date field
    const type = elem.getAttribute("data-type");
    // Get The Property Name from Element Attribute
    const property = elem.getAttribute("data-name");
    elem.childNodes[1].classList.remove('bi-arrow-down-up');
    if (order === "desc") {
      // @ts-ignore
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
      elem.childNodes[1].classList.remove('bi-arrow-down');
      elem.childNodes[1].classList.add('bi-arrow-up');
    }
    else {
      // @ts-ignore
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
      elem.childNodes[1].classList.remove('bi-arrow-up');
      elem.childNodes[1].classList.add('bi-arrow-down');
    }
  }
}
