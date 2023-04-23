import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface HistoryEntry {
  index: number;
  command: string;
  output: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: HistoryEntry[] = [];
  private index: number = 0;

  private historySubject = new Subject<HistoryEntry[]>();

  add(command: string, output: string): void {
    this.history.push({
      index: this.index,
      command: command,
      output: output,
    });
    this.index++;
    this.historySubject.next(this.history);
  }

  getHistory(): Observable<HistoryEntry[]> {
    return this.historySubject.asObservable();
  }

  getCommand(index: number): string {
    return this.history[index].command;
  }
}
