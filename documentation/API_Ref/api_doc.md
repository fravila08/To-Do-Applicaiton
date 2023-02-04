
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

``` http
  POST .../newtask
```
- Body of Request: 


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required:** Name of task being created |


- Body of Response: Will return true and the new task ID if item is successfully created

```
  {'itemCreated':boolean, 'id':int}
```
