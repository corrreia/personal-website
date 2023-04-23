import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromptComponent } from './prompt/prompt.component';
import { PreviousCommandsComponent } from './previous-commands/previous-commands.component';

@NgModule({
  declarations: [AppComponent, PromptComponent, PreviousCommandsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
