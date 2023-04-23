import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorDataService {
  constructor() {}

  colors = {
    black: '#1e2229',
    grey: '#7f8c8d',
    red: '#ed1515',
    other_red: '#c0392b',
    green: '#44853a',
    other_green: '#55a649',
    orange: '#f67400',
    yellow: '#fdbc4b',
    blue: '#1d99f3',
    other_blue: '#3daee9',
    purple: '#9b59b6',
    other_purple: '#8e44ad',
    turquoise: '#1abc9c',
    other_turquoise: '#16a085',
    white: '#fcfcfc',
    other_white: '#ffffff',
  };

  getColors() {
    return this.colors;
  }
}
