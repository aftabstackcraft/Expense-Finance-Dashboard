# Expense & Finance Dashboard

A responsive personal finance dashboard built with HTML, CSS, and Vanilla JavaScript for managing and tracking income and expenses.

## Live Demo

[Live Demo](https://aftabstackcraft.github.io/Expense-Finance-Dashboard/)

## About The Project

The Expense & Finance Dashboard is a frontend application designed to manage personal financial transactions.

The application allows users to add, edit, delete, search, and filter transactions while displaying financial statistics and visualizing daily expenses through an interactive Chart.js bar chart.

The main goal of this project was to practice handling real-world application data and understand how different parts of a JavaScript application connect together.

---

## Features

### Transaction Management

- Add income and expense transactions
- Edit existing transactions
- Delete transactions
- Store transaction title and description
- Assign categories
- Select transaction dates

### Search & Filtering

- Search transactions by title
- Search transactions by description
- Filter by transaction type
- Filter by category
- Filter transactions by month

### Dashboard

- Track total income
- Track total expenses
- Calculate current balance
- Display monthly financial information
- Display transaction statistics

### Expense Visualization

- Daily expense bar chart
- Month-based chart filtering
- Automatic chart updates
- Dynamic chart data generated from transaction data
- Chart.js integration

### Data Persistence

- Transaction data stored in localStorage
- Data remains available after page refresh
- JSON used for storing and retrieving application data

### Responsive Design

- Responsive layout
- Mobile-friendly interface
- Clean dashboard structure

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Chart.js
- LocalStorage

---

## JavaScript Concepts Practiced

This project helped me practice several JavaScript concepts:

- Arrays
- Objects
- Functions
- DOM manipulation
- Event listeners
- Event delegation
- Array `filter()`
- Array `find()`
- Array `map()`
- Array `forEach()`
- Conditional logic
- Template literals
- `crypto.randomUUID()`
- JSON
- LocalStorage
- Date handling
- Data transformation
- Dynamic rendering
- State management
- Chart.js
- Updating existing UI components

---

## Application Flow

The main application flow is:

```text
User Input
    ↓
Transaction Object
    ↓
Transactions Array
    ↓
localStorage
    ↓
DOM Rendering
    ↓
Search / Filter
    ↓
Dashboard Calculations
    ↓
Chart Data Transformation
    ↓
Chart.js Visualization
