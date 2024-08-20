# Restaurant-based application

## Goal

Innovative web / mobile application designed to enhance the dining experience for customers. It allows users to view restaurant menus, create a wishlist, and access advanced features such as table payments, table ordering, and social options to interact with other users and discover the best restaurants.


### Version 1.0
- **Menu Display**: Users can browse the menus of partner restaurants directly within the app.
- **Wishlist**: Users can add dishes or restaurants to their wishlist for future reference.
- **QR Codes**: Each restaurant has a unique QR code that users can scan to instantly access the establishment's menu.

### Version 2.0
- **Table Payment**: Integration of payment directly through the app. Users can split the bill among multiple people at the table.
- **Table Ordering**: Customers can place orders directly from the app, eliminating the need to wait for a server.

### Version 3.0
- **Restaurant and Dish Ratings**: Users can rate the restaurants and dishes they have tried, helping others discover the best spots.
- **Sharing and Following**: Users can share their favorite restaurants and follow other users to discover their recommendations.
- **Restaurant Data**: Leveraging collected data to offer a personalized experience and relevant suggestions based on user preferences.

### After Version 3.0
- **Mobile App Development**: Following Version 3.0, we plan to develop a dedicated mobile app to enhance user experience and provide more seamless access to all features on mobile devices.

## Technologies Used

- [Adonis.js](https://adonisjs.com/): A powerful Node.js framework for building web applications.
- [Inertia.js](https://inertiajs.com/): A library that allows you to create fully client-side rendered, single-page apps, without much of the complexity that comes with modern SPAs.
- [React](https://react.dev/)
- [Redis](https://redis.io/)

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/memsbdm/restaurant-side-project.git
    ```
2. Install the required dependencies:
    ```bash
    cd restaurant-side-project
    npm install
    ```
3. Rename .env.example to .env

4. Start the application:
    ```bash
    docker-compose up -d
    npm run dev
    ```
