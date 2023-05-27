
# Building Web Service & RESTful API for ToDoList with Express and Sequalize

The Todo List API allows you to manage tasks in a Todo List application. You can perform operations like creating a task, retrieving tasks, updating task details, and deleting tasks.

## Link Railway
```bash

  tpa-5-humaidi-hambali-production-fb80.up.railway.app

```



## Authentication
The API uses token-based authentication. To authenticate your requests, include an Authorization header with the value Bearer {token}. Obtain the token by signing in to the application.
## Error Response
The API returns the following error responses :
- **400 Bad Request**: The request is invalid or missing required parameters.
- **401 Unauthorized**: Authentication is required or the provided token is invalid.
- **404 Not Found**: The requested resource does not exist.
- **500 Internal Server Error**: An unexpected error occurred on the server.
## Endpoints
### Create an Account
- **URL**: /register
- **METHOD**: POST
- **REQUEST-BODY** :
```bash
  {
  "name" : "Humaidi Hambali",
  "email": "aliesp241@gmail.com",
  "password": "humaidi"
  }
```
- **response body**: 
```bash
  true
```

### Login
- **URL**: /login
- **METHOD**: POST
- **REQUEST-BODY** :
```bash
  {
  "email": "aliesp241@gmail.com",
  "password": "humaidi"
  }
```
- **response body**: 
```bash
  {
    "token": <a token will appear here>
}
```


### Create a Task
- **URL**: /todos
- **METHOD**: POST
- **REQUEST-BODY** : 
```bash
  {
  "task" : "memasak mie",
  "user_id": "2",
  "do_at": "2023-05-28 00:00:00"
  }
```


- **response body**: 

```bash
{
  "id": 1,
  "task": "memasak mie",
  "user_id": "2",
  "do_at": "2023-05-28 00:00:00",
  "createdAt": "2023-05-26T10:30:00Z",
  "updatedAt": "2023-05-26T10:30:00Z"
}
```


### Get All Tasks
- **URL**: /todos
- **METHOD**: GET
- **RESPONSE-BODY** : 

```bash
  [{
  "id": "1"
  "task" : "memasak mie",
  "user_id": "2",
  "do_at": "2023-05-28 00:00:00",
    "user":{
      "id":"2",
      "name":"John Doe",
      "email":"johnDoe@gmail.com",
      "password":"<encrypted password will appear here>"
  }
  },
  {
  "id": "2"
  "task" : "memasak nasi",
  "user_id": "1",
  "do_at": "2023-05-28 00:00:00",
    "user":{
      "id":"1",
      "name":"Humaidi Hambali",
      "email":"aliesp241@gmail.com",
      "password":"<encrypted password will appear here>"
  }
  }]
```

### Get Task By ID
- **URL**: /todos/{id}
- **METHOD**: GET
- **RESPONSE-BODY** : 

```bash
  {
  "id": "2"
  "task" : "memasak nasi",
  "user_id": "1",
  "do_at": "2023-05-28 00:00:00",
  "user":{
      "id":"1",
      "name":"Humaidi Hambali",
      "email":"aliesp241@gmail.com",
      "password":"<encrypted password will appear here>"
  }
  }
```


### Update a Task
- **URL**: `/todos/{id}`
- **METHOD**: `PUT`
- **REQUEST-BODY** : 

```bash
  {
  "task" : "memasak telur",
  "user_id": "1",
  "do_at": "2023-05-28 00:00:00"
  }
```

- **RESPONSE-BODY** :
```bash
{
  "id": 1,
  "task": "memasak telur",
  "user_id": "1",
  "do_at": "2023-05-28 00:00:00"
}
```

### Delete a Task By Id
- **URL**: /todos/{id}
- **METHOD**: DELETE
- **RESPONSE-BODY** : 204 No Content

### Delete All Task
- **URL**: /todos
- **METHOD**: DELETE
- **ESPONSE** : 204 No Content
