# Nexafour API

Production-ready Node.js REST API built with Express, MongoDB, and JWT authentication.

## Features

- **MVC architecture** — models, controllers, routes, validators, middleware
- **MongoDB + Mongoose** — schema validation, hooks, indexing
- **JWT authentication** — separate user and admin tokens
- **Admin authentication** — dedicated Admin model, login, and protected routes
- **Environment variables** — centralized config with required var checks
- **Validation** — `express-validator` + validation middleware
- **Error handling** — centralized `ApiError` + error middleware
- **File uploads** — Multer with type/size limits
- **Security** — Helmet, CORS, rate limiting

## Folder Structure

```
nexafour-softwares/
├── server.js                 # Entry point
├── package.json
├── .env.example
├── .gitignore
├── uploads/                  # Uploaded files (gitignored contents)
├── scripts/
│   └── seedAdmin.js          # Create/promote admin user
└── src/
    ├── app.js                # Express app setup
    ├── config/
    │   ├── database.js       # MongoDB connection
    │   └── env.js            # Environment config
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── adminAuth.controller.js
    │   ├── admin.controller.js
    │   ├── user.controller.js
    │   └── upload.controller.js
    ├── middleware/
    │   ├── asyncHandler.js
    │   ├── auth.middleware.js
    │   ├── adminAuth.middleware.js
    │   ├── role.middleware.js
    │   ├── validate.middleware.js
    │   ├── upload.middleware.js
    │   └── error.middleware.js
    ├── models/
    │   ├── Admin.model.js
    │   └── User.model.js
    ├── routes/
    │   ├── index.js
    │   ├── auth.routes.js
    │   ├── adminAuth.routes.js
    │   ├── admin.routes.js
    │   ├── user.routes.js
    │   └── upload.routes.js
    ├── utils/
    │   ├── ApiError.js
    │   ├── ApiResponse.js
    │   └── jwt.js
    └── validators/
        ├── auth.validator.js
        └── user.validator.js
```

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your MongoDB URI and JWT secret.

3. **Start MongoDB** (local or Atlas), then run:

   ```bash
   npm run dev
   ```

4. **Create an admin** (optional)

   Add to `.env`:

   ```
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=Admin1234
   ADMIN_NAME=Admin
   ```

   Then:

   ```bash
   node scripts/seedAdmin.js
   ```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/health` | — | Health check |
| POST | `/api/v1/auth/register` | — | Register user |
| POST | `/api/v1/auth/login` | — | User login |
| GET | `/api/v1/auth/me` | User JWT | Current user |
| PATCH | `/api/v1/users/profile` | User JWT | Update own profile |
| POST | `/api/v1/uploads/avatar` | User JWT | Upload avatar (multipart) |
| POST | `/api/v1/admin/auth/login` | — | Admin login |
| GET | `/api/v1/admin/auth/me` | Admin JWT | Current admin |
| GET | `/api/v1/admin/dashboard` | Admin JWT | Dashboard stats |
| GET | `/api/v1/admin/users` | Admin JWT | List users (paginated) |
| GET | `/api/v1/admin/users/:id` | Admin JWT | Get user by ID |
| PATCH | `/api/v1/admin/users/:id` | Admin JWT | Update user |
| DELETE | `/api/v1/admin/users/:id` | Admin JWT | Delete user |

### Auth Header

```
Authorization: Bearer <token>
```

### Example: Register

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Secret123"}'
```

### Example: Admin Login

```bash
curl -X POST http://localhost:5000/api/v1/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"ChangeMe123"}'
```

Use the returned admin token for protected admin routes:

```bash
curl http://localhost:5000/api/v1/admin/dashboard \
  -H "Authorization: Bearer <admin-token>"
```

### Example: Upload Avatar

```bash
curl -X POST http://localhost:5000/api/v1/uploads/avatar \
  -H "Authorization: Bearer <token>" \
  -F "avatar=@./photo.jpg"
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Production server |
| `npm run dev` | Development with nodemon |

## Production Checklist

- Set strong `JWT_SECRET`
- Restrict `CORS_ORIGIN` to your frontend domain(s)
- Use MongoDB Atlas or a managed cluster
- Set `NODE_ENV=production`
- Run behind a reverse proxy (nginx) with HTTPS
- Consider cloud storage (S3) instead of local `uploads/` for files
