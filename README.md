
# Project Overview

This project is a web application that integrates several advanced features, including authentication, internationalization, and data visualization. Built using Next.js, the application provides a rich user experience with a focus on managing organization-related information and dynamic data visualizations.

## Features

- **Login and Authentication**: Secure login functionality to access various parts of the application.
- **Localization**: Support for multiple languages and translation.
- **Organization Information**: Functionality to manage and display information about organizations.
- **Data Visualization**: Interactive Gantt chart to visualize time-based data, including custom bar and label rendering based on user input.

## Technologies

- **Next.js**: A React framework for building server-rendered and statically generated applications.
- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management library for JavaScript applications.
- **D3.js**: A library for producing dynamic, interactive data visualizations in web browsers.
- **i18next**: An internationalization framework for JavaScript applications.

## Features

### 1. Authentication

- **Login**: Users can log in securely using the provided authentication mechanism.
- **Protected Routes**: Certain parts of the application are only accessible to logged-in users.

### 2. Localization

- **Multiple Languages**: The application supports multiple languages, which can be switched dynamically.
- **Custom Translations**: Translations are managed through `next-i18next` for a seamless multi-language experience.

### 3. Organization Information

- **Organization Management**: Users can view information related to organizations.
- **Data Display**: Information about organizations is presented in a user-friendly format.

### 4. Data Visualization

- **Gantt Chart**: Visualizes time-based data with interactive elements.
  - **Dynamic Bars**: Bars are drawn based on the start and end dates of data entries.
  - **Labels**: Each bar can display a label, providing additional context about the data.
  - **Responsive Design**: The chart adjusts to different screen sizes and updates dynamically on data changes.


## Setup and Installation

1. **Clone the Repository**

   ```bash
   https://github.com/mervekara/merve-kara-digitopia-case-study.git
   cd merve-kara-digitopia-case-study
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

4. **Access the Application**

   Open `http://localhost:3000` in your browser to view the application.

## Contributing

We welcome contributions to the project. If you have any suggestions or improvements, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
