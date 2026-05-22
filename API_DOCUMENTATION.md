# Nexafour API Documentation

Complete reference for the Nexafour REST API (Express + MongoDB).

**Base URL:** `http://localhost:5000/api/v1`  
**Static uploads:** `http://localhost:5000/uploads/{filename}`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Standard Responses](#standard-responses)
3. [Health](#health)
4. [User Authentication](#user-authentication)
5. [User Profile](#user-profile)
6. [File Uploads](#file-uploads)
7. [Admin Authentication](#admin-authentication)
8. [Admin Dashboard & Users](#admin-dashboard--users)
9. [Hero Section](#hero-section)
10. [About Section](#about-section)
11. [Services](#services)
12. [Blogs](#blogs)
13. [Testimonials](#testimonials)
14. [Team Members](#team-members)
15. [Contact Form](#contact-form)

---

## Authentication

| Type | Header | Used on |
|------|--------|---------|
| **None** | — | Public endpoints |
| **User JWT** | `Authorization: Bearer <user_token>` | `/auth/me`, `/users/*`, `/uploads/*` |
| **Admin JWT** | `Authorization: Bearer <admin_token>` | All `/admin/*` routes (except `/admin/auth/login`) |

### Token payloads

**User token** (from register/login):
```json
{ "id": "<userId>", "role": "user", "type": "user" }
```

**Admin token** (from admin login):
```json
{ "id": "<adminId>", "type": "admin" }
```

Default expiry: `7d` (configurable via `JWT_EXPIRES_IN`).

---

## Standard Responses

### Success

```json
{
  "success": true,
  "message": "Success",
  "data": { }
}
```

**Created (201):** Same shape with `"message": "Created successfully"` or custom message.

### Paginated

```json
{
  "success": true,
  "message": "Success",
  "data": [ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### Error

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    { "field": "email", "message": "Valid email is required" }
  ]
}
```

| Status | Meaning |
|--------|---------|
| 400 | Validation error / bad request |
| 401 | Missing or invalid token |
| 403 | Forbidden (wrong token type or deactivated account) |
| 404 | Resource not found |
| 409 | Conflict (duplicate email/slug) |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 503 | Health check when DB disconnected |

---

## Health

### GET `/health`

Check API and database status.

| | |
|---|---|
| **Authentication** | None |

**Response (200 — DB connected):**
```json
{
  "success": true,
  "message": "API is running",
  "database": "connected",
  "timestamp": "2026-05-22T10:00:00.000Z"
}
```

**Response (503 — DB disconnected):**
```json
{
  "success": false,
  "message": "API is running",
  "database": "disconnected",
  "timestamp": "2026-05-22T10:00:00.000Z"
}
```

---

## User Authentication

### POST `/auth/register`

Register a new user account.

| | |
|---|---|
| **Authentication** | None |

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Secret123"
}
```

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| name | string | Yes | Max 100 chars |
| email | string | Yes | Valid email |
| password | string | Yes | Min 8 chars, uppercase + lowercase + number |

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": null,
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    },
    "token": "<jwt>"
  }
}
```

---

### POST `/auth/login`

| | |
|---|---|
| **Authentication** | None |

**Request body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { },
    "token": "<jwt>"
  }
}
```

**Errors:** `401` invalid credentials · `403` account deactivated

---

### GET `/auth/me`

Get current authenticated user.

| | |
|---|---|
| **Authentication** | User JWT |

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "user": { }
  }
}
```

---

## User Profile

### PATCH `/users/profile`

Update own profile.

| | |
|---|---|
| **Authentication** | User JWT |

**Request body (all optional):**
```json
{
  "name": "John Updated",
  "email": "newemail@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated",
  "data": {
    "user": { }
  }
}
```

---

## File Uploads

### POST `/uploads/avatar`

Upload user avatar image.

| | |
|---|---|
| **Authentication** | User JWT |
| **Content-Type** | `multipart/form-data` |

**Form field:**

| Field | Type | Required |
|-------|------|----------|
| avatar | file | Yes |

**Allowed types:** `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `application/pdf`  
**Max size:** 5MB (default, `MAX_FILE_SIZE` env)

**Response (200):**
```json
{
  "success": true,
  "message": "File uploaded",
  "data": {
    "user": { "avatar": "uploads/avatar-123456789.jpg" },
    "file": {
      "filename": "avatar-123456789.jpg",
      "path": "uploads/avatar-123456789.jpg"
    }
  }
}
```

---

## Admin Authentication

### POST `/admin/auth/login`

| | |
|---|---|
| **Authentication** | None |

**Request body:**
```json
{
  "email": "admin@example.com",
  "password": "ChangeMe123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "admin": {
      "_id": "...",
      "name": "Admin",
      "email": "admin@example.com",
      "isActive": true,
      "lastLogin": "...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    "token": "<admin_jwt>"
  }
}
```

---

### GET `/admin/auth/me`

| | |
|---|---|
| **Authentication** | Admin JWT |

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "admin": { }
  }
}
```

---

## Admin Dashboard & Users

> All routes below require **Admin JWT**.

### GET `/admin/dashboard`

| | |
|---|---|
| **Authentication** | Admin JWT |

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "stats": {
      "totalUsers": 10,
      "activeUsers": 8,
      "totalAdmins": 1
    }
  }
}
```

---

### GET `/admin/users`

List registered users (paginated).

| | |
|---|---|
| **Authentication** | Admin JWT |

**Query parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |

**Response (200):** Paginated `User[]` in `data`.

---

### GET `/admin/users/:id`

| | |
|---|---|
| **Authentication** | Admin JWT |

**Params:** `id` — MongoDB ObjectId

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "user": { }
  }
}
```

---

### PATCH `/admin/users/:id`

| | |
|---|---|
| **Authentication** | Admin JWT |

**Request body (all optional):**
```json
{
  "name": "Updated Name",
  "email": "user@example.com",
  "isActive": false
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated",
  "data": { "user": { } }
}
```

---

### DELETE `/admin/users/:id`

| | |
|---|---|
| **Authentication** | Admin JWT |

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted",
  "data": null
}
```

---

## Hero Section

### Public routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/hero` | None | List active heroes (`isActive: true`) |
| GET | `/hero/:id` | None | Get active hero by ID |

**Response (200):** `data` = `Hero[]` or single `Hero` object.

**Hero object:**
```json
{
  "_id": "...",
  "title": "Welcome",
  "subtitle": "Subtitle",
  "description": "Description text",
  "ctaText": "Get Started",
  "ctaLink": "/contact",
  "backgroundImage": "uploads/hero.jpg",
  "order": 0,
  "isActive": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Admin routes (`/admin/hero`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/hero` | List all heroes |
| GET | `/admin/hero/:id` | Get by ID |
| POST | `/admin/hero` | Create |
| PATCH | `/admin/hero/:id` | Update |
| DELETE | `/admin/hero/:id` | Delete |

**POST/PATCH request body:**
```json
{
  "title": "Welcome",
  "subtitle": "Optional",
  "description": "Optional",
  "ctaText": "Contact Us",
  "ctaLink": "/contact",
  "backgroundImage": "uploads/hero.jpg",
  "order": 0,
  "isActive": true
}
```

| Field | Required (create) |
|-------|-------------------|
| title | Yes |

**Response (201 create):** `data` = created Hero  
**Response (200 update):** `data` = updated Hero, `"message": "Updated successfully"`  
**Response (200 delete):** `data` = null, `"message": "Deleted successfully"`

---

## About Section

### Public routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/about` | None | List active about sections |
| GET | `/about/:id` | None | Get active about by ID |

**About object:**
```json
{
  "_id": "...",
  "title": "About Us",
  "subtitle": "Who we are",
  "description": "Long description...",
  "image": "uploads/about.jpg",
  "features": [
    { "_id": "...", "title": "Innovation", "description": "...", "icon": "lightbulb" }
  ],
  "isActive": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Admin routes (`/admin/about`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/about` | List all |
| GET | `/admin/about/:id` | Get by ID |
| POST | `/admin/about` | Create |
| PATCH | `/admin/about/:id` | Update |
| DELETE | `/admin/about/:id` | Delete |

**POST request body:**
```json
{
  "title": "About Us",
  "subtitle": "Optional",
  "description": "Required description",
  "image": "uploads/about.jpg",
  "features": [
    { "title": "Feature 1", "description": "Details", "icon": "star" }
  ],
  "isActive": true
}
```

| Field | Required (create) |
|-------|-------------------|
| title | Yes |
| description | Yes |

---

## Services

### Public routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/services` | None | List published services |
| GET | `/services/slug/:slug` | None | Get published service by slug |
| GET | `/services/:id` | None | Get published service by ID |

Only services with `status: "published"` are returned.

**Service object:**
```json
{
  "_id": "...",
  "title": "Web Development",
  "slug": "web-development",
  "shortDescription": "Short summary",
  "description": "Full description",
  "icon": "code",
  "image": "uploads/service.jpg",
  "status": "published",
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Status values:** `draft` · `published` · `archived`

### Admin routes (`/admin/services`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/services` | List all (optional filter) |
| GET | `/admin/services/:id` | Get by ID |
| POST | `/admin/services` | Create |
| PATCH | `/admin/services/:id` | Update |
| DELETE | `/admin/services/:id` | Delete |

**GET query:** `?status=draft|published|archived`

**POST request body:**
```json
{
  "title": "Web Development",
  "slug": "web-development",
  "shortDescription": "Custom web apps",
  "description": "Full service description",
  "icon": "code",
  "image": "uploads/service.jpg",
  "status": "draft"
}
```

| Field | Required (create) |
|-------|-------------------|
| title | Yes |
| shortDescription | Yes |
| description | Yes |
| slug | No (auto-generated from title) |

**Response (201):** `"message": "Service created"`, `data` = Service object

---

## Blogs

### Public routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/blogs` | None | List published blogs (excludes `content`) |
| GET | `/blogs/slug/:slug` | None | Get full published blog by slug |
| GET | `/blogs/:id` | None | Get full published blog by ID |

**GET query:** `?tag=nodejs` (filter by tag)

**Blog object (list — no content):**
```json
{
  "_id": "...",
  "title": "Post Title",
  "slug": "post-title",
  "featuredImage": "uploads/blog.jpg",
  "metaTitle": "SEO Title",
  "metaDescription": "SEO description",
  "tags": ["nodejs", "api"],
  "published": true,
  "publishedAt": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Blog object (single — includes content):**
```json
{
  "content": "<p>Full HTML or markdown content</p>",
  ...
}
```

### Admin routes (`/admin/blogs`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/blogs` | List all |
| GET | `/admin/blogs/:id` | Get by ID (full content) |
| POST | `/admin/blogs` | Create |
| PATCH | `/admin/blogs/:id` | Update |
| DELETE | `/admin/blogs/:id` | Delete |

**GET query:** `?published=true|false` · `?tag=nodejs`

**POST request body:**
```json
{
  "title": "Getting Started",
  "slug": "getting-started",
  "content": "Full post content",
  "featuredImage": "uploads/blog.jpg",
  "metaTitle": "SEO Title",
  "metaDescription": "Meta description",
  "tags": ["tutorial", "nodejs"],
  "published": false
}
```

| Field | Required (create) |
|-------|-------------------|
| title | Yes |
| content | Yes |

**Response (201):** `"message": "Blog post created"`

---

## Testimonials

### Public routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/testimonials` | None | List active testimonials |
| GET | `/testimonials/:id` | None | Get active testimonial by ID |

**Testimonial object:**
```json
{
  "_id": "...",
  "name": "Jane Doe",
  "designation": "CEO",
  "company": "Acme Inc",
  "message": "Great service!",
  "rating": 5,
  "image": "uploads/jane.jpg",
  "order": 0,
  "isActive": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Admin routes (`/admin/testimonials`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/testimonials` | List all |
| GET | `/admin/testimonials/:id` | Get by ID |
| POST | `/admin/testimonials` | Create |
| PATCH | `/admin/testimonials/:id` | Update |
| DELETE | `/admin/testimonials/:id` | Delete |

**POST request body:**
```json
{
  "name": "Jane Doe",
  "designation": "CEO",
  "company": "Acme Inc",
  "message": "Testimonial text",
  "rating": 5,
  "image": "uploads/jane.jpg",
  "order": 0,
  "isActive": true
}
```

| Field | Required (create) |
|-------|-------------------|
| name | Yes |
| message | Yes |

---

## Team Members

### Public routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/team` | None | List active team members |
| GET | `/team/:id` | None | Get active member by ID |

**Team member object:**
```json
{
  "_id": "...",
  "name": "John Smith",
  "designation": "Lead Developer",
  "bio": "Bio text",
  "image": "uploads/john.jpg",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/john",
    "twitter": "https://twitter.com/john",
    "github": "https://github.com/john",
    "email": "john@company.com"
  },
  "order": 0,
  "isActive": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Admin routes (`/admin/team`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/team` | List all |
| GET | `/admin/team/:id` | Get by ID |
| POST | `/admin/team` | Create |
| PATCH | `/admin/team/:id` | Update |
| DELETE | `/admin/team/:id` | Delete |

**POST request body:**
```json
{
  "name": "John Smith",
  "designation": "Lead Developer",
  "bio": "Optional bio",
  "image": "uploads/john.jpg",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/john",
    "twitter": "https://twitter.com/john",
    "github": "https://github.com/john",
    "email": "john@company.com"
  },
  "order": 0,
  "isActive": true
}
```

| Field | Required (create) |
|-------|-------------------|
| name | Yes |
| designation | Yes |

---

## Contact Form

### POST `/contact`

Submit a contact form (public).

| | |
|---|---|
| **Authentication** | None |

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I would like to discuss a project."
}
```

| Field | Type | Required |
|-------|------|----------|
| name | string | Yes (max 100) |
| email | string | Yes |
| phone | string | No (max 20) |
| message | string | Yes (max 2000) |

**Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "<contactId>"
  }
}
```

---

### Admin routes (`/admin/contacts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/contacts` | List submissions (paginated) |
| GET | `/admin/contacts/:id` | Get by ID (auto-marks as read) |
| PATCH | `/admin/contacts/:id/read` | Mark read/unread |
| DELETE | `/admin/contacts/:id` | Delete submission |

**GET query:**

| Param | Type | Description |
|-------|------|-------------|
| page | number | Page (default 1) |
| limit | number | Per page (default 10) |
| isRead | string | `true` or `false` |

**Response (200 list):** Paginated contact objects in `data`.

**Contact object:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Message text",
  "isRead": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

**PATCH `/admin/contacts/:id/read` request body:**
```json
{
  "isRead": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Submission updated",
  "data": { }
}
```

---

## Quick Reference — All Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/health` | None |
| POST | `/auth/register` | None |
| POST | `/auth/login` | None |
| GET | `/auth/me` | User |
| PATCH | `/users/profile` | User |
| POST | `/uploads/avatar` | User |
| POST | `/admin/auth/login` | None |
| GET | `/admin/auth/me` | Admin |
| GET | `/admin/dashboard` | Admin |
| GET/PATCH/DELETE | `/admin/users`, `/admin/users/:id` | Admin |
| GET/POST/PATCH/DELETE | `/admin/hero`, `/admin/hero/:id` | Admin |
| GET/POST/PATCH/DELETE | `/admin/about`, `/admin/about/:id` | Admin |
| GET/POST/PATCH/DELETE | `/admin/services`, `/admin/services/:id` | Admin |
| GET/POST/PATCH/DELETE | `/admin/blogs`, `/admin/blogs/:id` | Admin |
| GET/POST/PATCH/DELETE | `/admin/testimonials`, `/admin/testimonials/:id` | Admin |
| GET/POST/PATCH/DELETE | `/admin/team`, `/admin/team/:id` | Admin |
| GET/DELETE | `/admin/contacts`, `/admin/contacts/:id` | Admin |
| PATCH | `/admin/contacts/:id/read` | Admin |
| GET | `/hero`, `/hero/:id` | None |
| GET | `/about`, `/about/:id` | None |
| GET | `/services`, `/services/slug/:slug`, `/services/:id` | None |
| GET | `/blogs`, `/blogs/slug/:slug`, `/blogs/:id` | None |
| GET | `/testimonials`, `/testimonials/:id` | None |
| GET | `/team`, `/team/:id` | None |
| POST | `/contact` | None |

---

*Generated from source: `src/routes/`, `src/controllers/`, `src/validators/`, `src/models/`.*
