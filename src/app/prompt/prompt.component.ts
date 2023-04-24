import { Component, Renderer2, ElementRef, HostListener } from '@angular/core';

import { ColorDataService } from '../color-data.service';
import { CommandsService } from '../commands.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent {
  colors;
  prompt: string = '';

  constructor(
    private colorDataService: ColorDataService,
    private commandsService: CommandsService,
    private historyService: HistoryService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.colors = colorDataService.getColors();
    this.commandsService.processCommand('welcome').then((output) => {
      this.historyService.add('welcome', output);
    });
    this.commandsService.processCommand('about').then((output) => {
      this.historyService.add('about', output);
    });
  }

  search(term: string): void {
    term = term.trim();
    const inputEl = this.elementRef.nativeElement.querySelector('input');
    if (this.commandsService.exists(term) || term.startsWith('clear')) {
      this.renderer.setStyle(inputEl, 'color', this.colors.green);
    } else if (term === '') {
      this.renderer.setStyle(inputEl, 'color', this.colors.grey);
    } else {
      this.renderer.setStyle(inputEl, 'color', this.colors.red);
    }
  }

  @HostListener('keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    event.preventDefault(); // Prevents the default action of the enter key

    if (this.prompt === '') return; // Prevents the user from submitting an empty command

    if (this.prompt.startsWith('clear')) {
      this.historyService.clear();
      this.prompt = ''; // Clear the prompt
      this.search(this.prompt); // Set the color of the input element
      return;
    }

    const command: string = this.prompt;

    this.commandsService.processCommand(this.prompt).then((output) => {
      this.historyService.add(command, output);
    });

    this.prompt = ''; // Clear the prompt
    this.search(this.prompt); // Set the color of the input element
  }

  @HostListener('keydown.tab', ['$event'])
  onTabKey(event: KeyboardEvent) {
    event.preventDefault(); // Prevents the default action of the tab key
    this.prompt = this.commandsService.autoComplete(this.prompt);
    this.search(this.prompt); // Set the color of the input element
  }

  @HostListener('keydown.arrowup', ['$event'])
  onArrowUpKey(event: KeyboardEvent) {
    event.preventDefault(); // Prevents the default action of the arrow up key
    this.prompt = this.historyService.historyUp();
    this.search(this.prompt); // Set the color of the input element
  }

  @HostListener('keydown.arrowdown', ['$event'])
  onArrowDownKey(event: KeyboardEvent) {
    event.preventDefault(); // Prevents the default action of the arrow down key
    this.prompt = this.historyService.historyDown();
    this.search(this.prompt); // Set the color of the input element
  }
}
