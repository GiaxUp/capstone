# Capstone Project - Rocket Cinema Website
 This is my final Fullstack project for [EPICODE](https://epicode.com/it/)'s Web Developer course!  
I decided to create a ticket management site for a cinema, allowing registered users to choose their seats and save tickets on their profile.

## Main functions
* Register/Login with your credentials. Every user can manage his own tickets
* An always updated Home page with the last movies in theaters. There's 5 movies with shows in theaters, and other 20 in the "Coming Soon" section
* Watch the trailers from the Home page, with a click on "Watch Trailer" in the movie's posters you can turn off the light to enjoy your selected trailer
* Book your tickets! This is the core of the project. In the first section, you can select one of the five movies and purchase tickets while choosing your preferred seats. Before making a show time selection, you can check the movie ratings and read the best comments posted by other users about each movie. There's four avaiable theaters, each offering five different film projections. There is one movie shown each day, ensuring a diverse selection throughout the week. Additionally, each show has four different time slots, allowing you to choose the option that suits you best.
* Select your seats! In the movie page, after selecting the theater and the desired show time you will be redirected to the Checkout page where there is a seat selection. Every theater have 64 seats and you can choose if you want a Premium Seat for 20€ (first row) or a Classic Seat for 10€ (second to last row)
* After the review you can check and manage your tickets in your Profile, where you can find also your personal information stored during registration
* There's also a Promotions section where you can see the ongoing gadgets avaiable for some selected movies
## Demo
If you want to see the site in action, you can find a demo presentation <a href="https://www.youtube.com/watch?v=rV5nATfn-ko" target="_blank">HERE!</a>
## Technologies
I used most of the technologies learned in the last 6 months of the course. Here's a list with the most intresting ones:
* For the backend development, I used **Spring Boot**. Its extensive set of libraries and tools allowed to create a highly efficient and secure backend for the project with smooth data handling and efficient processing of user requests.
* Implemented **JWT** (JSON Web Tokens) **authentication** for my encrypted login system. This system ensures that user credentials are protected during transmission and provides a secure way to authenticate users. The authentication token is securely stored in the session storage, allowing us to utilize it in subsequent fetch requests throughout the project.
* To manage the databadse and the data flow I used **postgreSQL (using pgAdmin)**.
* On the frontend side I used **React**, a JavaScript library known for its simplicity, flexibility, and performance. Allowed me to build interactive and dynamic user interfaces, providing a smooth and responsive user experience.
* To handle API requests and communicate with the backend, I have incorporated **Axios**, a popular HTTP client for JavaScript. Axios simplifies the process of making asynchronous requests, handling responses, and managing errors effectively. It was actually my first time using it and it was nice understanding a new technology.
* To further enhance the user experience and manage data efficiently, I have integrated **Redux**, a powerful state management library. Created a centralized store where I can store and manage the application's data. With Redux, Rocket Cinema achieves a consistent and predictable state, allowing for efficient data retrieval and updates throughout the application.
## How to clone
Frontend:
1. First of all make sure to have Node.js on your system
2. Clone this repository with `$ git clone https://github.com/GiaxUp/Capstone/`
3. Enter in the project folder with `$ cd rocket_cinema`
4. Install all the dependencies with `$ npm i`
5. Start the application with `$ npm start` 
 
Backend:
1. Make sure to have Java and Maven on your system
2. Remember to update the **application.proprieties** file with your database credentials and stuff
3. Enter in the project folder with `$ cd rocket_cinema`
4. Start the application with `$ mvn spring-boot:run` and then click "Ok"

After that, create an account in the login page and log with that account. Your access token will be stored in the session storage. The top 5 movies in theater now will be saved in the database, allowing you (after a backend restart) to generate shows and shows seats for those movies. It's a little bit tricky but I'm pretty sure you can do it!
