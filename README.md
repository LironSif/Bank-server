# Bank App Backend

Backend for the Full Stack Banking Application

## About
The Bank App Backend is the server-side component of the Bank App, built with Express and Mongoose. It offers a robust and secure platform for handling banking operations, user management, and data persistence.

## Features
- RESTful API Endpoints: Facilitate communication between the frontend and the database.
- User Management: Endpoints for user registration, retrieval, and account management.
- Account Operations: Handle banking transactions like deposits, withdrawals, and transfers.
- Data Persistence: Store and manage user and transaction data using MongoDB.

## Technology Stack
- **Express.js**: Framework for creating robust server-side applications and RESTful APIs.
- **Mongoose**: MongoDB object modeling tool, providing a schema-based solution to model application data.
- **Node.js**: JavaScript runtime environment that executes JavaScript code server-side.
- **MongoDB**: NoSQL database for storing user and transaction data.

## Setup and Installation
1. Clone the repository:
git clone https://github.com/LironSif/bank-app-backend.git

2. Navigate to the project directory:
cd bank-app-backend

3. Install dependencies:
npm install

4. Set up environment variables in a `.env` file:

DATABASE_URL=<Your MongoDB URL>
JWT_SECRET=<Your JWT Secret>
PORT=<Server Port>

5. Run the server:


## API Endpoints
- User Endpoints:
- `GET /api/users/`: Get all users.
- `GET /api/users/:id`: Get a user by ID.
- `POST /api/users/`: Create a new user.
- `GET /api/users/email/:email`: Get user by email.
- Account Endpoints:
- `GET /api/accounts/`: Get all accounts.
- `GET /api/accounts/:id`: Get accounts by user ID.
- `POST /api/accounts/:id`: Create an account.
- `DELETE /api/accounts/:id`: Delete an account.
- `POST /api/accounts/:id/deposit`: Deposit funds.
- `POST /api/accounts/:id/withdraw`: Withdraw funds.
- `POST /api/accounts/:id/transfer`: Transfer funds.

## Development Note
The backend is continuously updated to improve performance, add new features, and ensure the best user experience.

## Deployment
The backend is deployed on [Render](https://render.com/), providing reliable and scalable cloud hosting.

## Contributing
Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests. For significant changes or feature suggestions, please open an issue first for discussion.

## Author
**Liron Sifado** - [GitHub Profile](https://github.com/LironSif)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements
- Database services by [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
