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

## Development server
after you configuring your database connection, then you can run it on development server
1. npm start
2. make sure there is no error after the server started
3. if you got ConnectionRefusedError, connect ECONNREFUSED ::1:3308 (example your database on port 3308), that mean there your port is not correct
4. if you got HostNotFoundError, getaddrinfo ENOTFOUND local (example your database's host is local), that mean your host or ip address is not correct
5. if you got AccessDeniedError, Access denied for user that mean your username or password (db_user or db_password) is not correct
6. everytime you re-configuring your .env you have to restart your server by ctrl+c and then npm start again
