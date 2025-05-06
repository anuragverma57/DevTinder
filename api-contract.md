# API Contract

## Success Response

- status(200)
- json
- {
  data: {}
  data.length : Number
  success: true
  message: Optional
  }

## Error Response

- status(400)
- json
- {
  Error: {}
  Success: false
  message: mandatory
  }

## devTinder API's

### AuthRoutes

- POST /auth/signup [X]
- POST /auth/login [X]
- POST /auth/logout [X]

### ProfileRoutes

- GET /profile/view [X]
- PATCH /profile/update [X]
- GET /profile/password [X]

### RequestRoutes

- POST /request/send/:status/:userId [X]
- POST /request/send/interested/:userId [X]
- POST /request/send/ignored/:userId [X]

- POST /request/review/:status/:requestId [X]
- POST /request/review/accepted/:requestId [X]
- POST /request/review/rejected/:requestId [X]

### UserRoutes

- GET /user/feed [X] Pagination also done in this api
- GET /connections [X]

- GET /requests/:type [X]
- GET /requests/:sent [X]
- GET /requests/:recieved [X]
