# API Reference

#### Get all Tasks

```http
  GET .../allTasks
```

- Body of Response: an array of Task dictionaries

```
  [{'id':integer, 'Title':string, 'Completed':boolean}]
```

#### Create a Task

```http
  POST .../newtask
```

- Body of Request:
```bash
  {'name':string}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `name`    | `string` | **Required:** Name of task being created |

- Body of Response: Will return task's id and true if item was `successfully` created. Otherwise task's id will default to 0.

```
  {'itemCreated':boolean, 'id':int}
```

#### Change Task's Completed Status

```http
  PUT .../changestatus/<int:id of selected task>
```

- Body of Request:

| Parameter | Type      | Description                       |
| :-------- | :-------- | :-------------------------------- |
| `id`      | `integer` | **Required:** ID of selected task |

- Body of Response: Will return if the task's completed status was changed.

```
  {'changed':boolean}
```

#### Resources

- [Django Class Views](https://docs.djangoproject.com/en/4.1/topics/class-based-views/)
- [Django Rest Frameworks APIview](https://www.django-rest-framework.org/api-guide/views/)
