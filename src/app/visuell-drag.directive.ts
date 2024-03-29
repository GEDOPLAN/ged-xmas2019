import { Directive, HostListener, HostBinding, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'img'
})
export class VisuellDragDirective implements AfterViewInit {
  constructor() {}

  @HostBinding('style.top')
  top: any;

  @HostBinding('style.left')
  left: any;

  startTop = 0;

  startLeft = 0;

  originalPosition: [string, string];

  @Output()
  placed = new EventEmitter<VisuellDragDirective>();

  @HostListener('drag', ['$event'])
  moveBall(event: DragEvent) {
    const y = document['___PAGEY'];
    const x = document['___PAGEX'];

    if (y && x) {
      this.top = y - this.startTop + 'px';
      this.left = x - this.startLeft + 'px';
    }
  }

  @HostListener('dragend', ['$event'])
  placeBall(event: DragEvent) {
    this.moveBall(event);
    this.placed.emit(this);
  }

  @HostListener('mousedown', ['$event'])
  saveClickPosition(event: MouseEvent) {
    this.startTop = event.offsetY;
    this.startLeft = event.offsetX;
  }

  ngAfterViewInit() {
    this.originalPosition = [this.left, this.top];
  }

  resetPosition() {
    [this.left, this.top] = this.originalPosition;
  }
}
