import { Injectable } from '@angular/core';
import { ColorDataService } from './color-data.service';

interface CommandMap {
  [command: string]: (args: string[]) => Promise<string>;
}

@Injectable({
  providedIn: 'root',
})
export class CommandsService {
  private colors;

  commands: CommandMap = {
    help: (args: string[]) => {
      return Promise.resolve(`Avaliable commands: ${this.helpHelper()}`);
    },
    welcome: (args: string[]) => {
      return Promise.resolve(`
        Welcome to my personal Website!<br>

        This is a work in progress, so please excuse the mess.<br>
        <span style="color: ${this.colors.other_green}">Type 'help' for a list of commands</span>
      `);
    },
    sudo: (args: string[]) => {
      return Promise.resolve(`
        <span style="color: ${this.colors.red}">Permission denied</span>
      `);
    },
    repo: (args: string[]) => {
      return Promise.resolve(`
        Check out the source code <a href="https://github.com/corrreia/personal-website" target="_blank" style="color: ${this.colors.other_blue}"> here</a>!
      `);
    },
    cv: (args: string[]) => {
      return Promise.resolve(`
        Check out my curriculum vitae <a href="https://cv.tomascorreia.net" target="_blank" style="color: ${this.colors.other_blue}"> here</a>!
      `);
    },
    github: (args: string[]) => {
      return Promise.resolve(`
        Check out my Github <a href="https://github.com/corrreia" target="_blank" style="color: ${this.colors.other_blue}"> here</a>!
      `);
    },
    linkedin: (args: string[]) => {
      return Promise.resolve(`
        Check out my Linkedin <a href="https://linkedin.com/in/tomasmcorreia" target="_blank" style="color: ${this.colors.other_blue}"> here</a>!
      `);
    },
    weather: (args: string[]) => {
      //if no args, use "" if args use args[0]%20args[1]...
      let city: string = '';
      if (args.length > 0) {
        city = args[0];
        for (let i = 1; i < args.length; i++) {
          city += '%20' + args[i];
        }
      }
      return fetch(
        `https://wttr.in/${city}?format=There%20are%20%t%20in%20%l%20and%20it%27s%20%C`
      ).then((response) => {
        return response.text();
      });
    },
    joke: async (args: string[]) => {
      const response = await fetch(
        'https://official-joke-api.appspot.com/random_joke'
      );
      const { setup, punchline } = await response.json();
      return Promise.resolve(`
      <em>${setup} ${punchline}</em>
    `);
    },
    quote: async (args: string[]) => {
      const response = await fetch('https://api.quotable.io/random');
      const { content, author } = await response.json();
      return Promise.resolve(`
      <em>"${content}" - ${author}</em>
    `);
    },
    advice: async (args: string[]) => {
      const response = await fetch('https://api.adviceslip.com/advice');
      const {
        slip: { advice },
      } = await response.json();
      return Promise.resolve(`
      <em>${advice}</em>
    `);
    },
    // fact: async (args: string[]) => {
    //   const response = await fetch(
    //     'https://useless-facts.sameerkumar.website/api'
    //   );
    //   const { data } = await response.json();
    //   return Promise.resolve(`
    //   <em>${data}</em>
    // `);
    // },
  };

  constructor(private colorDataService: ColorDataService) {
    this.colors = colorDataService.getColors();
  }

  private helpHelper(): string {
    const commands = Object.keys(this.commands);
    let helpString = '';
    for (let i = 0; i < commands.length; i++) {
      helpString += `${commands[i]}, `;
    }
    return helpString.slice(0, -2); // Remove the last comma and space
  }

  exists(command: string): boolean {
    return command.toLowerCase().trim().split(' ')[0] in this.commands;
  }

  async processCommand(commandString: string): Promise<string> {
    const commandArgs = commandString.split(' ');
    const command = commandArgs[0].toLowerCase().trim();
    const args = commandArgs.slice(1);

    if (!this.exists(command)) {
      return Promise.resolve(
        `${command}: command not found. Type 'help' for a list of commands.`
      );
    }

    try {
      const output = await this.commands[command](args);
      return Promise.resolve(output.toString());
    } catch (error: any) {
      return Promise.resolve(
        `Error executing command '${command}': ${error.message}`
      );
    }
  }

  autoComplete(command: string): string {
    if (command === '') return '';
    const commands = Object.keys(this.commands);
    for (let i = 0; i < commands.length; i++) {
      if (commands[i].startsWith(command)) {
        return commands[i];
      }
    }
    return command;
  }
}
