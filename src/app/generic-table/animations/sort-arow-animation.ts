import { animate, state, style, transition, trigger } from "@angular/animations";

export const rotateArrow = trigger('rotateArrow', [
  state(
    'ASC',
    style({
      transform: 'rotate(0)',
    })
  ),
  state(
    'DESC',
    style({
      transform: 'rotate(180deg)',
    })
  ),
  transition('ASC => DESC', [animate('0.25s ease-out')]),
  transition('DESC => ASC', [animate('0.25s ease-in')]),
])
