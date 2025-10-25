# LibraSphere API Documentation

## Base URL
```
http://127.0.0.1:8000
```

## Authentication
The API uses JWT (JSON Web Token) authentication. Protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Error Responses
All endpoints may return these error responses:

```json
{
    "error": "Error message description"
}
```

Common HTTP Status Codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 405: Method Not Allowed
- 500: Internal Server Error

## Endpoints

### Authentication

#### Login
```
POST /api/auth/login/
```

Authenticate a user and receive an access token.

**Request Body:**
```json
{
    "email": "user@example.com",
    "password": "yourpassword"
}
```

**Success Response:**
```json
{
    "status": "success",
    "token": "jwt_token_here",
    "user": {
        "name": "John",
        "student_number": "0623-000-1234",
        "role": "student"
    }
}
```

#### Register
```
POST /api/auth/register/
```

Register a new user account.

**Request Body:**
```json
{
    "first_name": "John",
    "middle_name": "", // optional
    "last_name": "Doe",
    "sex": "male", // optional
    "student_number": "0623-000-1234",
    "program": "BSCS", // optional
    "email": "john.doe@example.com",
    "confirm_password": "StrongPass123",
    "role": "student" // defaults to "student" if not provided
}
```

**Success Response:**
```json
{
    "status": "success",
    "message": "Registration successful"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### User Profile

#### Get User Profile
```
GET /api/profile/
```

Get the authenticated user's profile information.

**Headers Required:**
- Authorization: Bearer <token>

**Success Response:**
```json
{
    "status": "success",
    "profile": {
        "first_name": "John",
        "middle_name": "",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "student_number": "0623-000-1234",
        "program": "BSCS",
        "role": "student"
    }
}
```

### Admin Endpoints

#### Get All Users
```
GET /api/users/
```

Get a list of all users (Admin only).

**Headers Required:**
- Authorization: Bearer <token>

**Success Response:**
```json
{
    "status": "success",
    "users": [
        {
            "id": 1,
            "email": "user@example.com",
            "name": "John Doe",
            "student_number": "0623-000-1234",
            "role": "student"
        }
        // ... more users
    ]
}
```

### Books

#### Search Books
```
GET /books/
```

Search for books by general search term or category.

**Query Parameters:**
- `generalsearch`: Search across all fields (optional)
- `category`: Filter by category (optional)

**Example Requests:**
```
GET /books?generalsearch=python
GET /books?category=computer
```

**Success Response:**
```json
[
    {
        "title": "Book Title",
        "author": "Author Name",
        "cover_url": "https://covers.openlibrary.org/b/id/123-L.jpg",
        "work_key": "OL123W"
    }
    // ... more books
]
```

## Models

### UserLogin
- id (AutoField): Primary key
- email (CharField): Unique email address
- password (CharField): Hashed password
- role (CharField): User role ["student", "faculty", "admin"]

### UserProfile
- user (OneToOneField): Reference to UserLogin
- first_name (CharField)
- middle_name (CharField, optional)
- last_name (CharField)
- sex (CharField, optional): ["male", "female"]
- student_number (CharField): Unique identifier
- program (CharField, optional)

### Book
- work_key (CharField): Primary key from OpenLibrary
- title (CharField)
- author (CharField)
- cover_url (URLField, optional)

### BorrowRecord
- user (ForeignKey): Reference to UserLogin
- book_copy (ForeignKey): Reference to BookCopy
- borrow_date (DateField): Auto-set on creation
- return_date (DateField, optional)
- due_date (DateField)
- fine_amount (DecimalField)
- is_returned (BooleanField)

## Rate Limiting
Currently, no rate limiting is implemented.

## CORS
CORS is enabled for all origins in development. For production, this should be restricted to specific domains.

## Notes
- All timestamps are in UTC
- API versioning is not implemented yet
- Pagination is not implemented yet for list endpoints