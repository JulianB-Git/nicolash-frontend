# Wedding RSVP Backend API Documentation

## Overview

The Wedding RSVP Backend provides RESTful API endpoints for managing wedding guest invitations and responses. The API uses **Clerk authentication** with **allowlist authorization** for admin endpoints.

## Base URL

```
http://localhost:3000/api
```

## Authentication

### Admin Endpoints (🔒 Protected)

Admin endpoints require Clerk authentication with allowlist authorization:

- **Authentication**: Clerk session token required
- **Authorization**: User must be on Clerk Dashboard allowlist
- **Header**: `Authorization: Bearer <clerk-session-token>`

### Public Endpoints (🌐 Open)

RSVP endpoints are public and do not require authentication.

### Setup

1. Configure Clerk Dashboard allowlist: **User & Authentication** → **Restrictions** → **Allowlist**
2. Add admin emails to allowlist
3. Only allowlisted users can access admin endpoints

## Base URL

```
http://localhost:3000/api
```

## Data Models

### Attendee Object

```json
{
  "id": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com", // Optional - can be null
  "rsvpStatus": "pending", // "pending" | "accepted" | "declined"
  "dietaryRequirements": "Vegan", // "Vegan" | "Vegetarian" | "Other" | "None"
  "groupId": "group-uuid", // Optional - can be null
  "createdAt": "2023-12-01T10:00:00Z",
  "updatedAt": "2023-12-01T10:00:00Z",
  "rsvpSubmittedAt": "2023-12-01T10:00:00Z" // Optional - set when RSVP is submitted
}
```

### Dietary Requirements

The `dietaryRequirements` field allows tracking of guest dietary preferences:

- **Valid Values**: `"Vegan"`, `"Vegetarian"`, `"Other"`, `"None"`
- **Default**: `"None"` (if not specified)
- **Case-Sensitive**: Must match exactly
- **Optional**: Can be omitted during creation (defaults to "None")
- **Editable**: Can be updated at any time via PUT /attendees/:id
- **CSV Support**: Included in bulk upload CSV format

**Usage Examples:**

- Guest with no dietary restrictions: `"None"`
- Guest who is vegan: `"Vegan"`
- Guest who is vegetarian: `"Vegetarian"`
- Guest with other dietary needs (allergies, religious, etc.): `"Other"`

## Endpoints

### Attendees (🔒 Admin Only)

#### POST /attendees/bulk-upload

Upload a CSV file to bulk create attendees. **Requires Clerk authentication.**

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Headers: `Authorization: Bearer <clerk-session-token>`
- Body: Form data with file field named `file`

**File Requirements:**

- Format: CSV file
- Size limit: 50MB (increased for bulk uploads)
- Max records: 10000 (increased limit)
- Required columns: `firstName`, `lastName`
- Optional columns: `email`, `dietaryRequirements`, `groupName`

**CSV Format Example:**

```csv
firstName,lastName,email,dietaryRequirements,groupName
John,Doe,john.doe@example.com,Vegan,Smith Family
Jane,Smith,jane.smith@example.com,Vegetarian,Smith Family
Bob,Johnson,,None,
Alice,Brown,alice@example.com,Other,
```

**Note**: Empty email fields (empty strings or missing values) are automatically converted to null and are perfectly valid. Empty or missing `dietaryRequirements` fields default to "None".

**Response:**

```json
{
  "success": true,
  "data": {
    "success": true,
    "result": {
      "totalRecords": 3,
      "successfulCreations": 2,
      "failures": 0,
      "duplicates": 1,
      "errors": [
        {
          "row": 3,
          "field": "email",
          "value": "duplicate@example.com",
          "message": "Attendee with this email already exists in database"
        }
      ],
      "createdAttendees": [
        {
          "id": "uuid",
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@example.com",
          "rsvpStatus": "pending",
          "dietaryRequirements": "Vegan",
          "groupId": "group-uuid",
          "createdAt": "2023-12-01T10:00:00Z",
          "updatedAt": "2023-12-01T10:00:00Z"
        }
      ]
    },
    "message": "Bulk upload completed successfully"
  },
  "timestamp": "2023-12-01T10:00:00Z"
}
```

**Status Codes:**

- `200` - Success (all records processed)
- `207` - Multi-Status (partial success with some failures)
- `400` - Bad Request (validation errors, no records created)
- `401` - Unauthorized (missing or invalid Clerk token)
- `403` - Forbidden (user not on Clerk allowlist)
- `413` - Payload Too Large (file size exceeds 50MB)

**Error Handling:**

- Invalid file type: Returns 400 with error message
- File too large: Returns 413 with size limit information
- CSV parsing errors: Returns 400 with parsing details
- Validation errors: Included in response with row numbers and details
- Duplicate detection: Duplicates are skipped and reported in the result

**Features:**

- Automatic group creation if `groupName` is provided and doesn't exist
- Duplicate detection within CSV file and against existing database records
- Detailed validation with row-level error reporting
- Batch processing for optimal performance
- Transaction support to ensure data consistency

#### POST /attendees

Create a single attendee. **Requires Clerk authentication.**

**Request:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com", // Optional - can be omitted
  "dietaryRequirements": "Vegan", // Optional - defaults to "None"
  "groupId": "optional-group-uuid"
}
```

**Dietary Requirements:**

- Valid values: `"Vegan"`, `"Vegetarian"`, `"Other"`, `"None"`
- Optional field - defaults to `"None"` if not provided
- Case-sensitive

**Note**: Email is optional since not all attendees may have email addresses (e.g., children, plus-ones, elderly relatives).

**Headers:**

```
Authorization: Bearer <clerk-session-token>
Content-Type: application/json
```

#### GET /attendees

Retrieve all attendees with pagination. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Response:**

```json
{
  "success": true,
  "data": {
    "attendees": [
      {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "rsvpStatus": "pending",
        "dietaryRequirements": "Vegan",
        "groupId": "group-uuid",
        "createdAt": "2023-12-01T10:00:00Z",
        "updatedAt": "2023-12-01T10:00:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  },
  "timestamp": "2023-12-01T10:00:00Z"
}
```

#### GET /attendees/:id

Retrieve a specific attendee by ID. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "rsvpStatus": "pending",
    "dietaryRequirements": "Vegetarian",
    "groupId": "group-uuid",
    "createdAt": "2023-12-01T10:00:00Z",
    "updatedAt": "2023-12-01T10:00:00Z"
  },
  "timestamp": "2023-12-01T10:00:00Z"
}
```

#### PUT /attendees/:id

Update an existing attendee. **Requires Clerk authentication.**

**Request:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "dietaryRequirements": "Vegetarian", // Optional - can be updated
  "groupId": "group-uuid" // or "" to clear group, or omit to leave unchanged
}
```

**Dietary Requirements:**

- Valid values: `"Vegan"`, `"Vegetarian"`, `"Other"`, `"None"`
- Optional field - omit to leave unchanged
- Case-sensitive

**Group Management:**

- Include `"groupId": "uuid"` to assign attendee to a group
- Include `"groupId": ""` (empty string) to remove attendee from any group
- Omit `groupId` field entirely to leave group assignment unchanged

**Headers:**

```
Authorization: Bearer <clerk-session-token>
Content-Type: application/json
```

#### DELETE /attendees/:id

Delete an attendee. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
```

### RSVP (🌐 Public)

#### GET /rsvp/search

Search for attendees by name. **No authentication required.**

**Query Parameters:**

- `name` (required): Search term for first or last name

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "rsvpStatus": "pending",
      "dietaryRequirements": "None",
      "groupId": "group-uuid",
      "createdAt": "2023-12-01T10:00:00Z",
      "updatedAt": "2023-12-01T10:00:00Z"
    }
  ],
  "timestamp": "2023-12-01T10:00:00Z"
}
```

#### POST /rsvp/:id/respond

Submit an individual RSVP response. **No authentication required.**

**Request:**

```json
{
  "rsvpStatus": "accepted" // or "declined"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "rsvpStatus": "accepted",
    "dietaryRequirements": "Vegan",
    "groupId": "group-uuid",
    "createdAt": "2023-12-01T10:00:00Z",
    "updatedAt": "2023-12-01T10:00:00Z",
    "rsvpSubmittedAt": "2023-12-01T10:00:00Z"
  },
  "timestamp": "2023-12-01T10:00:00Z"
}
```

#### POST /rsvp/group/:groupId/respond

Submit RSVP responses for multiple group members. **No authentication required.**

### Groups (🔒 Admin Only)

#### POST /groups

Create an RSVP group. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
Content-Type: application/json
```

#### GET /groups

Get all RSVP groups. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
```

#### GET /groups/:id

Retrieve a group with all members. **No authentication required** (needed for RSVP flow).

**Note**: This endpoint is public to allow guests to view their group information during the RSVP process.

#### GET /groups/search

Search groups by name. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
```

**Query Parameters:**

```
name: string (required) - Search term for group names
```

#### GET /groups/:id/stats

Get group statistics including RSVP counts. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
```

#### PUT /groups/:id

Update group information. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Updated Group Name"
}
```

#### DELETE /groups/:id

Delete a group and remove all member associations. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Group deleted successfully"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### PUT /groups/:id/members

Add or remove members from a group. **Requires Clerk authentication.**

**Headers:**

```
Authorization: Bearer <clerk-session-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "attendeeIds": ["uuid1", "uuid2"],
  "action": "add" // or "remove"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "group-uuid",
    "name": "Group Name",
    "members": [
      {
        "id": "attendee-uuid",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "rsvpStatus": "pending",
        "dietaryRequirements": "None",
        "groupId": "group-uuid"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Headers:**

```
Authorization: Bearer <clerk-session-token>
Content-Type: application/json
```

## Authentication

### Clerk Authentication with Allowlist

The API uses **Clerk** for authentication with **allowlist authorization**:

- **Admin Endpoints**: Require Clerk session token + user must be on allowlist
- **Public Endpoints**: No authentication required (RSVP endpoints)

### Setup Instructions

1. **Clerk Dashboard Setup**:
   - Go to [Clerk Dashboard](https://dashboard.clerk.com/)
   - Navigate to **User & Authentication** → **Restrictions**
   - Enable **Allowlist**
   - Add admin email addresses to the allowlist

2. **Frontend Integration**:

   ```javascript
   import { useAuth } from "@clerk/nextjs";

   const { getToken } = useAuth();
   const token = await getToken();

   // Use token in API requests
   fetch("/api/attendees", {
     headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
     },
   });
   ```

### Authentication Errors

- **401 Unauthorized**: Missing or invalid Clerk token
- **403 Forbidden**: Valid token but user not on allowlist

## Rate Limiting

- General API: 100 requests per 15 minutes per IP
- RSVP endpoints: Stricter limits apply
- Search endpoints: Additional rate limiting

## Error Response Format

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  },
  "timestamp": "2023-12-01T10:00:00Z"
}
```

### Common Error Codes

- `AUTHENTICATION_REQUIRED`: Missing Clerk token
- `INSUFFICIENT_PERMISSIONS`: User not on allowlist
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests

## Testing

Use the provided Postman collection (`Wedding-RSVP-Backend.postman_collection.json`) for testing all endpoints, including the bulk upload functionality with the sample `test-attendees.csv` file.
