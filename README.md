# Introduction to Interview Kickstart Project

The purpose of this small project is to address certain gaps in my knowledge related to the technologies employed by Grape.

## Project Overview

The project is a straightforward initiative utilizing Node.js, GraphQL, and PostgreSQL to develop a basic API.

### Prerequisites

To set up the required software, follow the installation steps for the following:

- Node.js
- PostgreSQL
- Prisma
- GraphQL


### Installation Process

To install Prisma, please refer to the [official Prisma documentation](https://www.prisma.io/docs/getting-started/setup-prisma/
start-from-scratch/relational-databases-typescript-postgresql).

### Simple Schema 

The project includes a simple schema created to demonstrate the utilization of Prisma and GraphQL. [More details on model](doc/schema.md)

![Database Schema](doc/db_schema.png)



## Setting Up and Starting Your "grape-learn" Project

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd grape-learn
```

Replace `<repository-url>` with the URL of your Git repository.

### Step 2: Install Dependencies

```bash
npm install
```

This command installs all the dependencies listed in your `package.json` file.

### Step 3: Configure Environment Variables

Create a `.env` file at the root of your project and configure any necessary environment variables. Make sure to include sensitive information like API keys in this file.

```env
# Example .env file
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

### Step 4: Run Development Server

```bash
npm run dev
```

This command starts the development server using `ts-node-dev`. It watches for changes in your TypeScript files and restarts the server accordingly.

### Step 5: Access Your Application

Visit `http://localhost:4000` (or the port specified in your application) in your web browser to access your application.

### Additional Commands:

- **Start Production Server:**

```bash
npm start
```

This command runs the production server using the compiled TypeScript code.

- **Run Tests:**

```bash
npm test
```

Execute your Jest tests.

- **Build the Project:**

```bash
npm run build
```

This command cleans the `dist` directory, generates necessary files, transpiles TypeScript to JavaScript, and builds the Prisma schema.

- **Generate Prisma Client:**

```bash
npm run generate:prisma
```

Run Prisma to generate the client based on your schema.


