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

- /request/send/interested/:userId [X]
- /request/send/ignored/:userId [X]

- /request/review/accepted/:requestId[X]
- /request/review/rejected/:requestId[X]

### UserRoutes

- /user/feed [X]
