# FrontEnd Tests With Django

## Pre-Requisites

- Clone the repository
- Change directory into `to_do_client`
- Run `npm install`

## Running Tests

- Running All Unit Test

```bash
    npm run test Unit.test.tsx
```

- End-to-End (e2e) Test

  - **NOTE**: Ensure to manually clean and load data to the applications database before running each test. ( Please refer to the `Run Locally` section for directions on loading data )

  - Creating a task

  ```bash
      npm run test CreatingNewTaskE2E.test.tsx
  ```

  - Changing Task Status (Pending/Completed)

  ```bash
    npm run test ChangingTaskStatusE2E.test.tsx
  ```
