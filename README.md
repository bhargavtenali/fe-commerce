# Product Management App

This is a React-based frontend application for managing a list of products with various attributes. The app provides a user-friendly interface to view, edit, and manage product information, including nested variants with support for inline editing.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Components](#components)
  - [ProductItem](#productitem)
  - [EditableField](#editablefield)
- [Usage](#usage)

---

## Getting Started

Follow these steps to set up and run the application on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/bhargavtenali/fe-commerce.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**:

   ```bash
   npm start
   ```

2. **Open your browser**:
   Go to `http://localhost:3000` to view the application.

## Components

### ProductList

The `ProductList` component is responsible for managing and rendering the list of products. It serves as a container for multiple `ProductItem` components, handling data structure and updates passed down to each item.

**Props**:

- `products`: Array of product objects to display.
- `onProductUpdate`: Function to handle updates to individual product items.

**Key Methods**:

- `renderProducts`: Iterates over the `products` array to render each `ProductItem`, passing necessary props.

### ProductItem

The `ProductItem` component is responsible for rendering each product and its nested variants. This component includes logic to expand/collapse rows for primary and secondary variants and handles updates to product fields.

**Props**:

- `product`: Object containing product information and variants.
- `onUpdate`: Function to handle updates to the product data.

**Key Methods**:

- `handleToggleExpand`: Toggles the visibility of product details.
- `handleToggleVariant`: Toggles the visibility of secondary variants.
- `handleUpdate`: Updates product fields.
- `handleVariantUpdate`: Updates primary variant fields.
- `handleSecondaryVariantUpdate`: Updates secondary variant fields.

### EditableField

The `EditableField` component allows inline editing of specific fields, like price and inventory. When clicked, it switches from a static display to an input field with options to save or cancel changes.

**Props**:

- `value`: The initial value to display and edit.
- `onUpdate`: Callback to save the updated value.

**Key Methods**:

- `handleEdit`: Enables editing mode.
- `handleCancel`: Cancels editing and reverts changes.
- `handleSave`: Validates and saves the input value.

## Usage

1. **View Products**: The app displays a list of products in a table format. Each product row can be expanded to reveal variants.
2. **Edit Fields**: Click on fields like price and inventory to edit them inline. Save or cancel changes as needed.
3. **Expand/Collapse Variants**: Use the expand/collapse icons to view primary and secondary variants associated with each product.
