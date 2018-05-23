import { hashSync } from 'bcrypt-nodejs';

const testPassword = hashSync('password');

const createUsersTableQuery = "DROP TABLE IF EXISTS users CASCADE; DROP TYPE IF EXISTS user_status; CREATE TYPE user_status AS ENUM ('user', 'admin'); CREATE TABLE users(id SERIAL PRIMARY KEY,username VARCHAR (20) NOT NULL UNIQUE,fullname VARCHAR (50) NOT NULL,email VARCHAR (50) NOT NULL UNIQUE,password VARCHAR (240) NOT NULL,role user_status default 'user',created_at timestamp (0) without time zone default now());";
const usersTableSeed = `INSERT INTO users(username,fullname,email,password)(VALUES('johnson','Holmes','me@you','${testPassword}'));`;
const createRequestsTableQuery = "DROP TABLE IF EXISTS requests; DROP TYPE IF EXISTS request_type; DROP TYPE IF EXISTS request_status; DROP TYPE IF EXISTS current_state; CREATE TYPE request_type AS ENUM ('repairs', 'maintenance'); CREATE TYPE request_status AS ENUM ('pending', 'approved', 'disapproved'); CREATE TYPE current_state AS ENUM ('pending', 'in progress', 'resolved'); CREATE TABLE requests(id SERIAL PRIMARY KEY,user_id int,title VARCHAR (40) NOT NULL,description TEXT NOT NULL,type request_type default 'repairs',status request_status default 'pending',state current_state default 'pending',created_at timestamp (0) without time zone default now(),FOREIGN KEY (user_id) REFERENCES users(id));";
const requestsTableSeed = "INSERT INTO requests(user_id,title,description)(VALUES(1,'BROKEN CHAIR','THE CHAIR IS BROKEN'));";
const queries = `${createUsersTableQuery}${usersTableSeed}${createRequestsTableQuery}${requestsTableSeed}`;

export default queries;
