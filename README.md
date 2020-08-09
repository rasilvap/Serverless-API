# Serverless API

This is full stack project built with NodeJs and react using Firebase as Database. The initial objective iss to handle a microservices environment with NodeJs as backend and react as a Front End.

# Tech Stack

NodeJs

ReactJS

Firebase

dotEnv

Axios

jwt

Firebase admin SDK

Docker compose

The serverApp runs in the port: 8081 by default.

Json example for createUser Endpoint

```
{
    "user": {
    "firstName": "Pablo",
    "lastName": "Neruda",
    "gender": "man",
    "age": 24,
    "userName": "neruda",
    "password": "pablo123",
    "address": {
        "streetAddress": "126",
        "city": "San Jone",
        "state": "CA",
        "postalCode": "394221"
    },
    "phoneNumbers": [
        { "type": "home", "number": "7383627627" }
    ]
  }
}
```

Json example for create comments:
```
{
  "comments": {
    "comments": "This is an example comment"
  }
}
```

The application is using jwt for user authentication, once the user is logged, the token is used to obatain his information, with the above body we get the user info as response:
```
{
    "comments": "This is a new comment",
    "userName": "neruda"
}
```
Run in Postman:

To run the endpoints through postman you can use the next collection: [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/c32627bde472bcdf8d98) 
