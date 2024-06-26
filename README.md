﻿# CartRabbit
Backend Terminal

Install Node.js:
sudo apt install nodejs


Install required npm packages:
npm install bcrypt nodemon multer-path cookie-parser


Frontend Terminal
Install Bootstrap:
npm install bootstrap

Setup Instructions

Step 1: Open Two Terminals in VS Code
Open your VS Code editor.
Open two terminal instances within VS Code. One will be used for the backend server and the other for the frontend.
Backend Setup

Step 2: Server Terminal
Navigate to the server directory:
cd Server

Start the backend server:
npm start

You should see a message:
Connected Successfully

Frontend Setup
Step 3: Frontend Terminal
Navigate to the frontend directory:
cd employee

Start the frontend server:
npm start

The frontend interface should now be displayed on your screen.
Application Walkthrough

Step 4: Login Page
The initial page displayed is the "Login As" page.
Admin Website

Step 5: Admin Login
Use the following credentials to log in as an admin:
Email: admin@gmail.com
Password: 123
Select "Admin" to view the admin dashboard.

Step 6: Admin Dashboard Navigation
The admin website will display a navigation bar with the following options:
Dashboard
Manage Employee
Department
Profile
Logout

Step 7: Dashboard
The Dashboard will display:
Total employees
Total admins
Total salary

Step 8: Manage Employee
In the "Manage Employee" section, you can:
Add employee details
Update employee details
Delete employee details

Step 9: Department
In the "Department" section, you can:
Add new departments

Step 10: Profile
In the "Profile" section, you can:
View the admin email ID

Step 11: Logout
Click "Logout" to exit the admin website.
Employee Website

Step 12: Employee Login

Use the following credentials to log in as an employee:
ID: 1
Email: sathish@gmail.com
Password: 1234

Step 13: Employee Dashboard
Only authorized users can access this module.
Enter the login details to access the employee dashboard.

Step 14: Authorized Employee Actions

Authorized employees can:
Edit their own details using the "Edit" button.
View their own details (not other employees' details).
Logout using the "Logout" button.
Security

Step 15: Token-Based Security
For security purposes, token authentication is implemented.
