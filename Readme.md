## Setup
1. First clone this repository to your computer
2. Second run npm install or npm i

## Database
I am using Xampp to run MySQL database,
1. run Xampp
2. start apache and start MySQL
3. click admin on MySQL to open PHPMyAdmin
4. create new database named mcm_db

## Configuring Database Connection
1. back to repository
2. open .env
3. change db_port to your running MySQL port, by default it is running on port 3306 (check your port on xampp)
4. change db_host if your database not on localhost
5. change the db_password if you have password for your database
6. and if you not named your database by mcm_db then change db_name to your database's name

## Check Database Connection
after you configuring your database connection, then you can run it on development server
1. npm start
2. make sure there is no error after the server started
3. if you got ConnectionRefusedError, connect ECONNREFUSED ::1:3308 (example your database on port 3308), that mean there your port is not correct
4. if you got HostNotFoundError, getaddrinfo ENOTFOUND local (example your database's host is local), that mean your host or ip address is not correct
5. if you got AccessDeniedError, Access denied for user that mean your username or password (db_user or db_password) is not correct
6. everytime you re-configuring your .env you have to restart your server by ctrl+c and then npm start again

## Table Migration
if there is no error anymore,
1. shut down the server by ctrl+c
2. run npx sequelize-cli db:migrate
3. then start again by npm start

## API Testing
to test API you can simply use api.http by installing REST Client Extensions on your Visual Studio Code or you can use Postman

this is API List, make sure you change ip address and server running port http://localhost:4000/
### Studio
- http://localhost:4000/studios/insert  body={"name": string, "capacity": integer}
- http://localhost:4000/studios/studio/:id
- http://localhost:4000/studios/all
- http://localhost:4000/studios/update/:id body={"name": string, "capacity": integer}
- http://localhost:4000/studios/delete/:id

### Film
- http://localhost:4000/films/insert  body={"title": string, "description": string, "genre": string, "studioId": integer, "duration": interger}
- http://localhost:4000/films/film/:id
- http://localhost:4000/films/all
- http://localhost:4000/films/update/:id  body={"title": string, "description": string, "genre": string, "studioId": integer, "duration": interger}
- http://localhost:4000/films/delete/:id

### Showtime
- http://localhost:4000/showtimes/insert  body={"filmId": integer, "time": date }
- http://localhost:4000/showtimes/showtime/:id
- http://localhost:4000/showtimes/all
- http://localhost:4000/showtimes/update/:id  body={"filmId": integer, "time": date }
- http://localhost:4000/showtimes/delete/:id

### Ticket
- http://localhost:4000/tickets/insert  body={"seatRow": string, "seatNumber": integer, "showtimeId": integer }
- http://localhost:4000/tickets/ticket/:id
- http://localhost:4000/tickets/all
- http://localhost:4000/tickets/update/:id  body={"seatRow": string, "seatNumber": integer, "showtimeId": integer }
- http://localhost:4000/tickets/delete/:id

For clear image of API you can check routes folder
