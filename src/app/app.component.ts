import { Component } from '@angular/core';
import { VisuellDragDirective } from './visuell-drag.directive';
@Component({
  selector: 'ged-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  balls = [
    { file: '1.png', posy: 525, posx: 435, check: false },
    { file: '2.png', posy: 390, posx: 506, check: false },
    { file: '3.png', posy: 570, posx: 725, check: false },
    { file: '4.png', posy: 305, posx: 705, check: false },
    { file: '5.png', posy: 390, posx: 630, check: false },
    { file: '6.png', posy: 90, posx: 630, check: false }
  ];

  ballPlaced(drag: VisuellDragDirective, ball: any) {
    if (this.inRange(drag.left, ball.posx) && this.inRange(drag.top, ball.posy)) {
      ball.check = true;
    } else {
      drag.resetPosition();
      ball.check = false;
    }
  }

  inRange(a: number | string, b: number | string) {
    if (typeof a === 'string') a = Number.parseInt(a.replace('px', ''));
    if (typeof b === 'string') b = Number.parseInt(b.replace('px', ''));

    return a - 20 < b && a + 20 > b;
  }

  get readyForChristmas() {
    return this.balls.every(e => e.check);
  }
}
