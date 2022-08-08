# A demo project of channel messenger

## Deploy

1. Run `npm i`
2. Run ``

Steps to run this project:

1. Run `npm i` command
2. Run `docker-compose up` command
3. Run `npm start` command

## API

### Get all channels
`GET http://localhost:3000/channels`

Results:

```json
[
  {"id": 1, "name": "xxxx"}
]
```

### Create a channel
`POST http://localhost:3000/channels`

Body:

| Name      | Type   | Optional |
|-----------|--------|----------|
| Name      | String | No       |

### Get message list
`GET http://localhost:3000/messages`
```json
{
    "data": [
        {
            "id": 1,
            "title": "hello world!",
            "content": "This is my first message.",
            "createdAt": "2022-08-08T08:28:42.000Z",
            "updatedAt": "2022-08-08T08:28:42.000Z",
            "channel": {
                "id": 1,
                "name": "Life",
                "createdAt": "2022-08-08T08:28:42.000Z",
                "updatedAt": "2022-08-08T08:28:42.000Z"
            }
        }
    ],
    "total": 4,
    "page_size": 10,
    "page": 1,
    "total_page": 1
}
```
### Create a message
`POST http://localhost:3000/messages`

Body:

| Name       | Type   | Optional |
|------------|--------|----------|
| channel_id | Int    | No       |
| title      | String | No       |
| content    | String | No       |
