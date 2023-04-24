import { Component } from '@angular/core';
import { ColorDataService } from '../color-data.service';
import { HistoryService } from '../history.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-previous-commands',
  templateUrl: './previous-commands.component.html',
  styleUrls: ['./previous-commands.component.css'],
})
export class PreviousCommandsComponent {
  colors;
  history: {
    command: string;
    output: SafeHtml;
  }[] = [];

  constructor(
    private colorDataService: ColorDataService,
    private historyService: HistoryService,
    private sanitizer: DomSanitizer
  ) {
    this.colors = colorDataService.getColors();
    this.historyService.getCommandsOnDisplay().subscribe((history) => {
      this.history = history.map((entry) => {
        return {
          command: entry.command,
          output: sanitizer.bypassSecurityTrustHtml(entry.output),
        };
      });
    });
  }
}
