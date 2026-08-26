# Announcements

This library contains the Announcements module for PeopleHub. All
announcement functionality — both admin and non-admin — lives directly
under `src/lib` (there is intentionally **no** separate `admin` folder).

## Components

- `announcements-add-announcement` (`AddAnnouncementComponent`) — container that hosts the add/edit/view modal and the announcement summary table.
- `announcements-summary` (`SummaryComponent`) — searchable, filterable table of announcements with edit/delete/view actions.
- `announcements-announcements` (`AnnouncementsComponent`) — read-only pinned/recent announcements card.
- `announcements-expire` (`ExpireComponent`) — list of expiring announcements with an inline create form.
- `announcements-view-announcement` (`ViewAnnouncementComponent`) — announcement detail view.

## Services

- `AnnouncementsService` — module-facing facade backed by the shared `CommonService` for all HTTP operations.

## Structure

```
src/lib/
  components/         # all announcement components (admin + non-admin)
  config/             # reactive form configs, models and types
  services/           # AnnouncementsService
```

Shared models (`Announcement`, `ExpireAnnouncement`, `AnnouncementInfo`,
`DropdownOption`, etc.) and shared UI controls are consumed from the
`common` and `ui` libraries respectively.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build announcements
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:

   ```bash
   cd dist/announcements
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
