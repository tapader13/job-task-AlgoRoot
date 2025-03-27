# Project Overview

I've created a React.js application with user authentication and a data table dashboard using only JavaScript and native HTML elements with Tailwind CSS for styling. Here's a breakdown of the key features:

## Authentication System

- **Login/Signup Forms**: Complete with validation for email, password, and confirmation
- **Local Storage**: User data and sessions are stored in localStorage
- **Form Validation**: Custom validation with clear error messages
- **Session Management**: Automatic redirection based on authentication status

### Dashboard

- **Navbar**: Contains the logo and user dropdown menu with custom implementation
- **Sidebar**: Shows the current page (Details)
- **User Menu**: Displays user information with logout and delete account options

### Data Table

- **API Integration**: Fetches data from the provided MockAPI endpoint
- **Sorting**: Click column headers to sort data in ascending/descending order
- **Searching**: Filter data based on user input across multiple fields
- **Pagination**: Navigate through data with customizable items per page
- **Status Indicators**: Visual badges for priority levels and completion status

### Responsive Design

- The application is fully responsive for both desktop and mobile devices
- Mobile-friendly navigation with appropriate layout adjustments

### Implementation Details

- Used only native HTML elements (no component libraries)
- Implemented all UI components from scratch with Tailwind CSS
- Used JavaScript instead of TypeScript
- Custom dropdown and dialog implementations without external libraries
- Maintained all functionality from the original requirements

## How to Use

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Access your account with email and password
3. **Dashboard**: View and interact with the data table
4. **User Management**: Access your profile, logout, or delete your account from the user menu

The application meets all the requirements specified in the task, including local storage for authentication, responsive design, and comprehensive data table functionality.
