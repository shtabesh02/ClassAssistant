# ClassAssistant

## DB Schema
![DB Schema](./images/caschema.png)
<!-- <img src="schema.png" alt="DB Schema" width="500"> -->


## Team Members
- Yitian
- Shir
- Henry
- Hemanth

Class Assistant is a web application designed to enhance the university course experience by addressing a key limitation of the Blackboard platform. The project's core purpose is to provide professors with a reliable way to send announcements with file attachments—a feature not supported by Blackboard's native email function. The application serves as a centralized platform for professors to manage and distribute course materials and for students to receive them in a timely and organized manner. 

Live Demo: https://buclassassistant.onrender.com/ 

## Core Features
Professor Admin Panel: A secure dashboard for professors to manage their courses. 

Announcement System: Professors can create announcements, attach files, and schedule them for automated distribution. 

Student Roster Management: Easily upload and manage student lists via .xlsx files. 

Event & Assignment Creation: Post important dates for quizzes and assignments. 

Student Notifications: Students can subscribe to receive timely email notifications for new announcements and events. 

## Tech Stack
This project uses the following technologies and tools:

- Frontend: React, Redux, Material-UI (MUI), CSS3
- Backend: Node.js, Express.js
- Database: PostgreSQL with Sequelize ORM
- File Handling: Multer for uploads and AWS S3 for storage.
- Email Service: Nodemailer for automated notifications.
- Deployment: Render for hosting the web service and database.
  
### a short note:
```
npx sequelize model:generate --name User --attributes first_name:string,last_name:string

npx dotenv sequelize db:migrate

npx sequelize seed:generate --name <name of seed>
npx dotenv sequelize db:seed:all
```
## Dependencies

`cd` into the `backend` folder and initialize the server's `package.json` by
running `npm init -y`.

`npm install` the following packages as dependencies:

- `cookie-parser` - parsing cookies from requests
- `cors` - CORS
- `csurf` - CSRF protection
- `dotenv` - load environment variables into Node.js from a `.env` file
- `express` - Express
- `express-async-errors` - handling `async` route handlers
- `helmet` - security middleware
- `jsonwebtoken` - JWT
- `morgan` - logging information about server requests/responses
- `per-env` - use environment variables for starting app differently
- `sequelize@6` - Sequelize
- `sequelize-cli@6` - use `sequelize` in the command line
- `pg` - use Postgres as the production environment database

`npm install -D` the following packages as dev-dependencies:

- `sqlite3` - SQLite3
- `dotenv-cli` - use `dotenv` in the command line
- `nodemon` - hot reload server `backend` files

In the __frontend__ folder, `npm install` the following packages as
dependencies:
- `npm i react` - Reactjs
- `js-cookie` - extracts cookies
- `react-redux` - React components and hooks for Redux
- `react-router-dom` - routing for React
- `redux` - Redux
- `redux-thunk` - Redux thunk

`npm install -D` the following packages as dev-dependencies:

- `redux-logger` - log Redux actions in the browser's DevTools console

### More tools
- `Nodemailer` to send email
- `multer` - to handle uploads
