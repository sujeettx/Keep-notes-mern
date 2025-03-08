graph TD
  A[note-app] --> B[backend]
  A --> C[frontend]
  
  B --> D[config]
  B --> E[controllers]
  B --> F[middlewares]
  B --> G[models]
  B --> H[routes]
  B --> I[utils]
  B --> J[uploads]
  B --> K[server.js]
  B --> L[package.json]
  B --> M[.env]
  
  D --> D1[db.js]
  D --> D2[cloudinary.js]
  
  E --> E1[authController.js]
  E --> E2[noteController.js]
  
  F --> F1[authMiddleware.js]
  F --> F2[errorMiddleware.js]
  F --> F3[uploadMiddleware.js]
  
  G --> G1[User.js]
  G --> G2[Note.js]
  
  H --> H1[authRoutes.js]
  H --> H2[noteRoutes.js]
  
  I --> I1[validators.js]
  I --> I2[helpers.js]