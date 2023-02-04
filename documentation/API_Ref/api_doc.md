# API Reference

#### Get all Tasks

```http
  GET .../allTasks
```

- Body of Response: an array of Task dictionaries

```
  [{'id':number, 'Title':string, 'Completed':boolean}]
```

#### Create a Task

```http
  POST .../newtask
```

- Body of Request:

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `name`    | `string` | **Required:** Name of task being created |

- Body of Response: Will return task's id and true if item was `successfully` created. Otherwise task's id will default to 0.

```
  {'itemCreated':boolean, 'id':int}
```
