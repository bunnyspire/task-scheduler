# Task Scheduler

This project implements a task scheduler allowing clients to register tasks that will be executed at specific times or on recurring schedules. The system supports both one-time and recurring tasks, ensuring tasks are executed within 10 seconds of their scheduled execution time.

## Features

- Create, edit, and delete one-time and recurring tasks.
- Display scheduled tasks and executed tasks.
- Responsive frontend using React and MUI.
- Backend implemented with Express.js and TypeScript.
- Uses Docker for containerization.

## Components

- **Frontend**: React with MUI for a responsive UI.
- **Backend**: Express.js with TypeScript for handling API requests.
- **In-Memory Database**: Used for task storage in the prototype.
- **Task Scheduler**: Manages the execution of scheduled tasks.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Running the Application

1. Build and start the containers:
   ```sh
   cd task-scheduler
   docker-compose up --build
   ```

2. Access the frontend:
  Open your browser and navigate to `http://localhost`.
  
3. Access the backend API:
  The backend is exposed on port 3000. You can make API requests to `http://localhost:3000`.
