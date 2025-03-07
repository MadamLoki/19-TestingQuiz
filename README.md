# Testing Quiz Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that serves as an interactive Python programming quiz. The application fetches random Python programming questions from a MongoDB database and presents them to users in a clean, interactive interface. Users can test their Python knowledge, track their scores, and retake quizzes as needed.

## Table of Contents

- [Testing Quiz Application](#testing-quiz-application)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Video Demo](#video-demo)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Testing](#testing)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Development Mode](#development-mode)
    - [Production Build](#production-build)
  - [Database Setup](#database-setup)
  - [Project Structure](#project-structure)
  - [Testing](#testing-1)
    - [Component Tests](#component-tests)
    - [End-to-End Tests](#end-to-end-tests)
  - [Contributing](#contributing)
  - [License](#license)

## Video Demo

[Link to Video Demo](https://drive.google.com/file/d/1MDcvnWbQzNLiP2adiwFoEmb02QqIsghw/view?usp=sharing)

## Features

- Random selection of Python programming questions
- Multiple-choice answer format
- Real-time score tracking
- Mobile-friendly, responsive design
- Ability to restart the quiz with new questions
- MongoDB integration for question storage

## Technologies Used

### Frontend
- React.js (with TypeScript)
- Bootstrap for styling
- Vite.js for build tooling and development server

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose ODM

### Testing
- Cypress for end-to-end and component testing

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd python-quiz-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

   This will install dependencies for both the client and server.

3. Create a `.env` file in the server directory:
   ```
   cd server
   cp .env.EXAMPLE .env
   ```

4. Edit the `.env` file to include your MongoDB connection URI:
   ```
   MONGODB_URI='mongodb://127.0.0.1:27017/techquiz'
   ```
   
   Note: You'll need MongoDB installed and running locally, or you can use a cloud MongoDB service.

## Usage

### Development Mode

To run the application in development mode:

```
npm run start:dev
```

This will:
- Start the Express server in watch mode
- Start the React development server with Vite
- Connect to your MongoDB database

The application will be available at http://localhost:3001

### Production Build

To create a production build:

```
npm run build
```

To start the production server:

```
npm start
```

## Database Setup

Seed the database with Python questions:

```
npm run seed
```

This will populate your MongoDB with a series of Python-related questions.

## Project Structure

The project is organized into client and server directories:

```
project-root/
├── client/             # Frontend React application
│   ├── public/         # Static assets
│   ├── src/            # React components and utilities
│   │   ├── components/ # React components
│   │   ├── models/     # TypeScript interfaces
│   │   └── services/   # API service functions
│   └── ...
├── server/             # Backend Express application
│   ├── src/            # Server source code
│   │   ├── config/     # Database configuration
│   │   ├── controllers/# Request handlers
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # API routes
│   │   └── seeds/      # Database seed data
│   └── ...
├── cypress/            # Cypress testing files
└── ...
```

## Testing

The application includes Cypress tests for both component testing and end-to-end testing.

Run the tests:

```
npm test
```

This will execute both the component tests and the end-to-end tests.

### Component Tests

Tests individual React components in isolation.

### End-to-End Tests

Tests the full application workflow, simulating user interactions with the quiz interface.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
