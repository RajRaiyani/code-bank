# Green Code / Code Bank

Green Code (or Code Bank) is a MERN stack project aimed at creating an interactive user dashboard where users can engage with questions, solutions in multiple languages, like and comment on questions, and contribute blogs. The project also features user authentication, lazy loading, custom hooks, and various libraries for enhanced functionality.

## live on vercel - https://code-bank-front.vercel.app/
## username - "user" password - "12345678"
## superuser - "superuser" - password - "12345678"
## Features

- **User Dashboard**: Users can interact with questions, solutions, and blogs.
- **Question Interaction**: Users can engage with questions in multiple ways and filter them based on level and category.
- **Like and Comment**: Users can like and comment on questions and blogs.
- **Blog Creation**: Users can create blogs in Markdown or HTML language.
- **Admin Panel**: Admins have full control over users, questions, blogs, comments, categories, and solutions. They can also view the history of changes made.
- **Super User Functionality**: Super users can request the addition of questions, which upon approval by the admin, become live.
- **Data Persistence**: MongoDB is used for data storage.
- **Authentication**: JWT is used for user authentication.

## Installation

To run the project locally, follow these steps:

### Client

1. Navigate to the client folder: `cd client`
2. Install dependencies: `npm install`
3. Start the client: `npm start`

### Server

1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Start the server: `nodemon index.js`

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Other Libraries**: Lazy loading, custom hooks, etc.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any enhancements or bug fixes.

