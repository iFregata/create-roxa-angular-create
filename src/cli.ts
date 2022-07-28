#!/usr/bin/env node
import { copyFile, rename } from "fs/promises";
import { AfterHookOptions, create } from 'create-create-app';
import { resolve } from 'path';
import Handlebars from 'handlebars';

Handlebars.registerHelper('raw-helper', (options) =>{
  return options.fn();
});

const templateRoot = resolve(__dirname, '..', 'templates');

const caveat = `
Congratulation! your angular project has been created.
`;

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.

create('create-roxa-angular-create', {
  templateRoot,
  extra: {
    architecture: {
      type: 'list',
      describe: 'choose your fave os',
      choices: ['macOS', 'Windows', 'Linux'],
      prompt: 'if-no-arg',
    },
  },
  after: ({ answers }) => console.log(`Ok you chose ${answers.architecture}.`),
  caveat,
});
