# 📝 NoteVault - Modern Note-Taking API

![NoteVault API](https://res.cloudinary.com/demo/image/upload/v1631924076/server-api-banner_rnvw78.gif)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Storage-purple.svg)](https://cloudinary.com/)

A powerful, secure backend API for a feature-rich note-taking application with rich text editing, file attachments, and note sharing capabilities.

## ✨ Features

- **🔐 Secure Authentication**: JWT tokens & bcrypt password hashing
- **📝 CRUD Operations**: Create, read, update, and delete notes
- **🔍 Search & Filter**: Find notes by content, title, or tags
- **📂 Categories & Tags**: Organize notes with custom tags
- **💾 Auto-save**: Automatically save notes during editing
- **🔗 Shareable Notes**: Generate public links to share notes
- **📸 Image Uploads**: Store images via Cloudinary integration
- **📎 File Attachments**: Upload and link files to notes

## 📁 Folder Structure

```
note-vault-api/
├── config/
│   ├── db.js                 # MongoDB connection setup
│   ├── cloudinary.js         # Cloudinary configuration
├── controllers/
│   ├── authController.js     # User authentication logic
│   ├── noteController.js     # Note CRUD operations
├── middleware/
│   ├── auth.js               # JWT verification middleware
│   ├── errorHandler.js       # Global error handler
│   └── upload.js             # Multer middleware for uploads
├── models/
│   ├── User.js               # User schema and model
│   └── Note.js               # Note schema and model
├── routes/
│   ├── authRoutes.js         # Authentication endpoints
│   ├── noteRoutes.js         # Note management endpoints 
├── utils/
│   ├── validators.js         # Input validation
│   └── helper.js             # Standard response helper
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── server.js                 # Express application entry point
└── package.json              # Node.js dependencies
```

## 🚀 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create new user account |
| POST | `/auth/login` | Authenticate user & get JWT |
| GET | `/auth/me` | Get current user info |

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Get all user notes |
| GET | `/notes/:id` | Get a specific note |
| POST | `/notes` | Create a new note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |
| GET | `/notes/search?q=query` | Search notes by title/content |
| GET | `/notes/tags/:tag` | Filter notes by tag |
| GET | `/notes/share/:shareId` | Get a shared note (public) |

### File Uploads

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload/image` | Upload an image to Cloudinary |
| POST | `/upload/file` | Upload a file attachment |
| DELETE | `/upload/:fileId` | Remove an uploaded file |

## 💻 Installation & Setup

1. **Clone the repository**
   ```
   git clone https://github.com/sujeettx/Keep-notes-mern
   cd Backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Create .env file with the following variables**
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://your-connection-string
   JWT_SECRET=your-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start the server**
   ```
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Core Technologies

- **Express.js**: Fast, unopinionated web framework for Node.js
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for secure user authentication
- **bcrypt**: Password hashing for secure user data
- **Cloudinary**: Cloud-based image and video management
- **Multer**: Middleware for handling multipart/form-data

## 📝 Implementation Details

### User Authentication
- Secure signup and login processes
- Password hashing with bcrypt
- JWT tokens stored in HTTP-only cookies
- Protected routes with middleware verification

### Note Management
- Complete CRUD functionality
- Rich text content storage
- Tag-based organization system
- Flexible search capabilities

### File Storage with Cloudinary
- Seamless image uploads directly from user's system
- Secure file storage in the cloud
- Various file types support (images, documents, etc.)
- Automatic file optimization

## 🔒 Security Features

- **Password Hashing**: All passwords are securely hashed using bcrypt
- **JWT Authentication**: Secure user sessions with JSON Web Tokens
- **HTTP-Only Cookies**: Prevents client-side JS from accessing tokens
- **Input Validation**: Server-side validation for all user inputs
- **MongoDB Injection Prevention**: Sanitized queries to prevent NoSQL injection
- **CORS Protection**: Configured Cross-Origin Resource Sharing

## 🧪 Testing

Run tests using Jest:

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --testPathPattern=auth
```

## 📋 Future Enhancements

- [ ] Email verification for new accounts
- [ ] OAuth integration (Google, GitHub)
- [ ] Rate limiting for API endpoints
- [ ] Note versioning/history
- [ ] Collaborative editing
- [ ] Note encryption for sensitive data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Made with ❤️ by sujeet kushwaha
