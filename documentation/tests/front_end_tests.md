# FrontEnd Tests With Django

## Pre-Requisites

- Ensure both the `to_do_client` and `to_do_server` are running
- All test commands must be ran from the `to_do_client` parent directory

## Running Tests

- Unit Tests

```bash
    npm run test Unit.test.tsx
```

- Intigration Tests

```bash
    npm run test INT.test.tsx
```

- End-to-End (e2e) Tests

  - **NOTE**:

    - `Ensure to manually clean and load data to the applications database before running each E2E tests`. ( Please refer to the [Run Locally](https://github.com/fravila08/To-Do-Applicaiton/blob/TODO-004/documentation/running_locally.md) section for directions on loading data )

    - E2E tests will open up a chromium browser to run tests.

  - Creating A task

  ```bash
      npm run test CreatingNewTaskE2E.test.tsx
  ```

  - Changing Task Status

  ```bash
      npm run test ChangingTaskStatusE2E.test.tsx
  ```

  - Changing Multiple Task's Status

  ```bash
      npm run test ChangingMultipleTaskStatusE2E.test.tsx
  ```

## Resources

- [Vitest](https://vitest.dev/guide/)
- [Puppeteer](https://pptr.dev)
