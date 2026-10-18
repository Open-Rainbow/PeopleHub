#!/usr/bin/env node
/**
 * Moves angular.json off the deprecated Webpack-era builders:
 *   @angular-devkit/build-angular:application  -> @angular/build:application
 *   @angular-devkit/build-angular:dev-server   -> @angular/build:dev-server
 *   @angular-devkit/build-angular:extract-i18n -> @angular/build:extract-i18n
 *   @angular-devkit/build-angular:ng-packagr   -> @angular/build:ng-packagr
 * Storybook builders are left alone (they still need @angular-devkit/build-angular installed).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'angular.json');
const before = readFileSync(file, 'utf8');
const after = before.replace(
  /"@angular-devkit\/build-angular:(application|dev-server|extract-i18n|ng-packagr)"/g,
  '"@angular/build:$1"',
);

const changed = (before.match(/@angular-devkit\/build-angular:(application|dev-server|extract-i18n|ng-packagr)/g) || []).length;
writeFileSync(file, after, 'utf8');
console.log(`Updated ${changed} builder reference(s) in angular.json.`);
