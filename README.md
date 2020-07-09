# Serverless API

This is full stack project built with NodeJs and react using Firebase as Database. The initial objective iss to handle a microservices environment with NodeJs as backend and react as a backed.

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
    "user": "userNo",
    "password": "pass",
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
