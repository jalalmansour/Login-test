# EHC Training Hub

## Project Description

The EHC Training Hub is a comprehensive platform designed for managing the entire training lifecycle within an organization. It includes features for CRM and sales, client and contract management, subscriptions, billing, support, and a robust SIRH (Human Resources Information System) for training engineering, planning, participant management, evaluations, and reporting. The platform utilizes a modular monolith architecture with a React.js frontend, an Express.js backend, and a MySQL database.

## Setup Instructions

To set up the development environment using Docker Compose, follow these steps:

1.  **Clone the repository:**


# EHC Training Hub

## Project Description

The EHC Training Hub is a comprehensive platform designed for managing the entire training lifecycle within an organization. It includes features for CRM and sales, client and contract management, subscriptions, billing, support, and a robust SIRH (Human Resources Information System) for training engineering, planning, participant management, evaluations, and reporting. The platform utilizes a modular monolith architecture with a React.js frontend, an Express.js backend, and a MySQL database.

## Setup Instructions

To set up the development environment using Docker Compose, follow these steps:

1.  **Clone the repository:**
    
```
bash
    git clone <repository_url>
    cd ehc-formation-system
    
```
2.  **Create `.env` file:**
    Copy the `.env.example` file and rename it to `.env`. Update the environment variables with your specific configurations.
```
bash
    cp .env.example .env
    
```
3.  **Build and run the Docker containers:**
```
bash
    docker-compose up --build
    
```
This will build the frontend and backend images, start the database service, and link them together.

4.  **Install dependencies (alternative/manual setup):**
    If you are not using Docker Compose or need to install dependencies manually, navigate into the `frontend` and `backend` directories and install the dependencies using npm or yarn.

    For the frontend:
```
bash
    cd frontend
    npm install # or yarn install
    
```
For the backend:
```
bash
    cd backend
    npm install # or yarn install
    
```
## Running the Application

Once the Docker containers are running, the frontend should be accessible at `http://localhost:3000` and the backend API at `http://localhost:5000`.

If running manually:

To start the frontend development server:
```
bash
cd frontend
npm run dev # or yarn dev
```
To start the backend server:
```
bash
cd backend
npm run dev # or yarn dev
```
## Project Structure
```
ehc-formation-system/
├── frontend/                    # React.js App
├── backend/                     # Express.js API
├── database/                    # MySQL Scripts
├── shared/                      # Code partagé
├── uploads/                     # Fichiers uploadés
├── docs/                        # Documentation
├── docker-compose.yml           # Docker configuration
├── .env.example                 # Environment variables example
└── README.md                    # Project README
```
## Technologies Used

*   **Frontend:** React.js (v18), Ant Design, Redux Toolkit, Axios, Moment.js, jsPDF, xlsx, Chart.js, React-Chartjs-2, React-Router-Dom, React Lazy, React Memo.
*   **Backend:** Express.js, Node.js, Sequelize, MySQL2, jsonwebtoken, bcryptjs, multer, nodemailer, express-validator, joi, winston, redis.
*   **Database:** MySQL.

## Contribution

Guidelines for contribution will be added later.

## License

This project is proprietary to EHC Groupe and intended for internal use only. Any external sharing or unauthorized use of the source code is strictly prohibited and subject to legal action.