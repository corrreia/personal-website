import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface CommandsOnDisplay {
  command: string;
  output: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: string[] = [];
  private historyIndex = 0;

  private commandsOnScreen: CommandsOnDisplay[] = [];
  private commandsSubject = new Subject<CommandsOnDisplay[]>();

  add(command: string, output: string): void {
    this.commandsOnScreen.push({
      command: command,
      output: output,
    });
    this.history.push(command);
    this.historyIndex = this.history.length - 1;
    this.commandsSubject.next(this.commandsOnScreen);
  }

  getCommandsOnDisplay(): Observable<CommandsOnDisplay[]> {
    return this.commandsSubject.asObservable();
  }

  getCommand(index: number): string {
    return this.commandsOnScreen[index].command;
  }

  clear(): void {
    this.commandsOnScreen = [];
    this.commandsSubject.next(this.commandsOnScreen);
  }

  historyUp(): string {
    const ret = this.history[this.historyIndex];
    if (this.historyIndex > 0) {
      this.historyIndex--;
    }
    return ret;
  }

  historyDown(): string {
    const ret = this.history[this.historyIndex];
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
    }
    return ret;
  }
}
