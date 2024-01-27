# IP - RightTrack API Documentation

## Base URL

- All endpoints are relative to the base URL: `http://server.rt-server.online`

## Authentication

- Most endpoints require a valid JWT token. Include the token in the request headers.
  - Header: `Authorization: Bearer {{token}}`

## Register

### Register a new user

- **Endpoint:** `POST /register`
- **Request:**
  - Method: `POST`
  - URL: `{{base_url}}/register`
  - Body:
    - `email`: User's email (text)
    - `username`: User's username (text)
    - `password`: User's password (text)
- **Response:**
  - Status: 201 Created

## Login

### Log in with existing credentials

- **Endpoint:** `POST /login`
- **Request:**
  - Method: `POST`
  - URL: `{{base_url}}/login`
- **Response:**
  - Status: 200 OK

## My Spending

### Get user spending information

- **Endpoint:** `GET /userspendings`
- **Request:**
  - Method: `GET`
  - URL: `{{base_url}}/userspendings`
  - Query Parameters:
    - `search`: Search by name (optional)
    - `filter`: Filter by category ID (numeric)
    - `date`: Filter by month (format: yyyy-mm)
    - `sort`: Sort by 'biggest' (amount) and 'newest' (date)
- **Response:**
  - Status: 200 OK

## New Spending

### Add a new spending entry

- **Endpoint:** `POST /userspendings`
- **Request:**
  - Method: `POST`
  - URL: `{{base_url}}/userspendings`
  - Body:
    - `name`: Spending name (text)
    - `amount`: Spending amount (numeric)
    - `description`: Spending description (text)
    - `date`: Spending date (format: yyyy-mm-dd)
    - `CategoryId`: Category ID (numeric)
- **Response:**
  - Status: 201 Created

## Spending by Id

### Get, update, or delete spending entry by ID

- **Endpoint:** `GET /userspendings/:id`
- **Request:**
  - Method: `GET`
  - URL: `{{base_url}}/userspendings/:id`
- **Response:**

  - Status: 200 OK

- **Endpoint:** `DELETE /userspendings/:id`
- **Request:**
  - Method: `DELETE`
  - URL: `{{base_url}}/userspendings/:id`
- **Response:**

  - Status: 200 OK

- **Endpoint:** `PUT /userspendings/:id`
- **Request:**
  - Method: `PUT`
  - URL: `{{base_url}}/userspendings/:id`
  - Body:
    - `name`: Updated spending name (text)
    - `description`: Updated spending description (text)
    - `CategoryId`: Updated category ID (numeric)
    - `amount`: Updated spending amount (numeric)
    - `date`: Updated spending date (format: yyyy-mm-dd)
- **Response:**
  - Status: 200 OK

## New Goal

### Create a new spending goal

- **Endpoint:** `POST /goal`
- **Request:**
  - Method: `POST`
  - URL: `{{base_url}}/goal`
  - Body:
    - `shopping`: Shopping goal (numeric)
    - `transportation`: Transportation goal (numeric)
    - `entertainment`: Entertainment goal (numeric)
    - `bills`: Bills goal (numeric)
    - `clothes`: Clothes goal (numeric)
    - `health`: Health goal (numeric)
    - `education`: Education goal (numeric)
    - `gift`: Gift goal (numeric)
    - `savings`: Savings goal (numeric)
    - `other`: Other goal (numeric)
    - `food`: Food goal (numeric)
- **Response:**
  - Status: 201 Created

## Goal

### Get or update spending goal

- **Endpoint:** `GET /goal`
- **Request:**
  - Method: `GET`
  - URL: `{{base_url}}/goal`
- **Response:**

  - Status: 200 OK

- **Endpoint:** `PUT /goal`
- **Request:**
  - Method: `PUT`
  - URL: `{{base_url}}/goal`
  - Body:
    - `shopping`: Updated shopping goal (numeric)
    - `transportation`: Updated transportation goal (numeric)
    - `entertainment`: Updated entertainment goal (numeric)
    - `bills`: Updated bills goal (numeric)
    - `clothes`: Updated clothes goal (numeric)
    - `health`: Updated health goal (numeric)
    - `education`: Updated education goal (numeric)
    - `gift`: Updated gift goal (numeric)
    - `savings`: Updated savings goal (numeric)
    - `other`: Updated other goal (numeric)
    - `food`: Updated food goal (numeric)
- **Response:**
  - Status: 200 OK

## Summary

### Get spending summary for a specific month

- **Endpoint:** `GET /summary`
- **Request:**
  - Method: `GET`
  - URL: `{{base_url}}/summary`
  - Query Parameter:
    - `date`: Filter by date (format: yyyy-mm)
- **Response:**
  - Status: 200 OK

## Categories

### Get all spending categories

- **Endpoint:** `GET /categories`
- **Request:**
  - Method: `GET`
  - URL: `{{base_url}}/categories`
- **Response:**
  - Status: 200 OK

## New Spending by Photo

### Add a new spending entry with a photo

- **Endpoint:** `POST /userspendings-photo`
- **Request:**
  - Method: `POST`
  - URL: `{{base_url}}/userspendings-photo`
  - Body (form-data):
    - `image`: Photo file
- **Response:**
  - Status: 200 OK

## Events

- **Prerequest event:** No specific actions specified.
- **Test event:** No specific actions specified.

# IP - Right Track API Error Handling

## Error Codes

- **400 Bad Request:** Invalid or malformed request.
- **401 Unauthorized:** Authentication failure or insufficient privileges.
- **403 Forbidden:** Request is valid, but the server refuses to respond.
- **404 Not Found:** Requested resource is not found.
- **500 Internal Server Error:** Unexpected server error.

## Error Responses

### `SequelizeValidationError`

- **Status Code:** 400 Bad Request
- **Message:** Validation error. Check the request payload.

### `SequelizeUniqueConstraintError`

- **Status Code:** 400 Bad Request
- **Message:** Username is already registered.

### `SequelizeForeignKeyConstraintError`

- **Status Code:** 400 Bad Request
- **Message:** Category/User is not available.

### `SequelizeDatabaseError`

- **Status Code:** 400 Bad Request
- **Message:** Invalid input.

### `TypeError`

- **Status Code:** 400 Bad Request
- **Message:** Invalid input type.

### `UploadError` / `MulterError`

- **Status Code:** 400 Bad Request
- **Message:** Failed to upload photo.

### `ReceiptError`

- **Status Code:** 400 Bad Request
- **Message:** Failed to process receipt.

### `InvalidCredentials`

- **Status Code:** 401 Unauthorized
- **Message:** Invalid username or password.

### `Unauthorized`

- **Status Code:** 401 Unauthorized
- **Message:** Please log in first!

### `JsonWebTokenError`

- **Status Code:** 401 Unauthorized
- **Message:** Please log in first!

### `TokenExpiredError`

- **Status Code:** 401 Unauthorized
- **Message:** Token expired!

### `DuplicateGoal`

- **Status Code:** 403 Forbidden
- **Message:** You already created your goal.

### `NotFound`

- **Status Code:** 404 Not Found
- **Message:** Data not found.

### General Errors

- **Status Code:** 500 Internal Server Error
- **Message:** Internal Server Error.
