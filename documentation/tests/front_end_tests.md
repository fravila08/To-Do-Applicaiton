# FrontEnd Tests With Django

## Pre-Requisites

- Clone the repository
- Change directory into `to_do_client`
- Run `npm install`

## Running Tests

- Running Unit Test

```bash
    npm run test Unit.test.tsx
```

- End-to-End (e2e) Test
  - **NOTE**: This will open a chromium browser and create a new task. If you'd like to run this test multiple times, please ensure to delete the newly created task from your database prior to.

```bash
    npm run test E2E.test.tsx
```
