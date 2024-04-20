# Financial Insights Service (Fi-Svc-1) 

## Introduction
Fi-Svc-1 Frontend is a React application designed to provide users with insights into their spending habits by allowing them to input their financial transactions and view basic insights. This README provides instructions on how to set up and run the frontend of the application.

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:
- Node.js (https://nodejs.org) - JavaScript runtime
- npm (https://www.npmjs.com)  JavaScript

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
```cd fi-svc-1-frontend
```

3. Install dependencies:
```
npm install
```

### Configuration
- Ensure that the backend server (Flask server) is running and accessible before starting the frontend application. Update the backend URL in the Axios configuration (api.js) if necessary.






## Setup Instructions For backend

### Prerequisites
- Python 3.x installed on your system
- pip package manager

### Installation Steps

 1 Clone the repository:
 
```bash
git clone https://github.com/your_username/fi-svc-1.git

```

2. Navigate to the project directory:

```
cd fi-svc-1/fi-svc-1-backend
```

3. Install dependencies using pip:

```
pip install Flask Flask-SQLAlchemy Flask-Cors
```

4. Run the Flask application:

```
python app.py
```

## API Endpoints
- Transaction Input
- URL: /transactions
- Method: POST
- Request Body:
```json{
  "date": "YYYY-MM-DD",
  "amount": 100.00,
  "category": "Food",
  "description": "Lunch at XYZ Restaurant"
}
```
- Response: 201 Created


- Get All Transactions
- URL: /transactions
- Method: GET

```json{
  "transactions": [
    {
      "id": 1,
      "date": "YYYY-MM-DD",
      "amount": 100.00,
      "category": "Food",
      "description": "Lunch at XYZ Restaurant"
    },
    {
      "id": 2,
      "date": "YYYY-MM-DD",
      "amount": 50.00,
      "category": "Transport",
      "description": "Bus fare"
    }
  ]
}
```











