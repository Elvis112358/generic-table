import { animate, state, style, transition, trigger } from "@angular/animations";

export const rotate = trigger('rotate', [
  state(
    'UP',
    style({
      transform: 'rotate(0)',
    })
  ),
  state(
    'DOWN',
    style({
      transform: 'rotate(180deg)',
    })
  ),
  transition('UP => DOWN', [animate('0.25s ease-out')]),
  transition('DOWN => UP', [animate('0.25s ease-in')]),
])
