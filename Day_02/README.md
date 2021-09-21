# PostgreSQL

- it is a database.
- collection of tables id called database.

```sql
postgres=# create database devs;
CREATE DATABASE
postgres=# \l
                                                 List of databases
   Name    |  Owner   | Encoding |          Collate           |           Ctype            |   Access privileges
-----------+----------+----------+----------------------------+----------------------------+-----------------------
 devs      | postgres | UTF8     | English_United States.1252 | English_United States.1252 |
 postgres  | postgres | UTF8     | English_United States.1252 | English_United States.1252 |
 template0 | postgres | UTF8     | English_United States.1252 | English_United States.1252 | =c/postgres          +
           |          |          |                            |                            | postgres=CTc/postgres
 template1 | postgres | UTF8     | English_United States.1252 | English_United States.1252 | =c/postgres          +
           |          |          |                            |                            | postgres=CTc/postgres
(4 rows)
```

- \l = list all databases
- \c = connect to database

```sql
postgres=# \c
You are now connected to database "postgres" as user "postgres".
postgres=# \c devs
You are now connected to database "devs" as user "postgres".
```

- \d = shows table

```sql
devs=# create table company(
devs(# ID int not null,
devs(# name char[50],
devs(# age int ,
devs(# address text
devs(# );
CREATE TABLE
devs=# \d
          List of relations
 Schema |  Name   | Type  |  Owner
--------+---------+-------+----------
 public | company | table | postgres
(1 row)

devs=# \d company
                  Table "public.company"
 Column  |      Type      | Collation | Nullable | Default
---------+----------------+-----------+----------+---------
 id      | integer        |           | not null |
 name    | character(1)[] |           |          |
 age     | integer        |           |          |
 address | text           |           |          |
```

- relation = table
- collection = database
- tuple = row
- record = all rows
- \q = to exit the cli

```sql
devs=# drop table company;
DROP TABLE
devs=# \d
Did not find any relations.
```

- DON'T FORGET SEMICOLON
- select * from comapny;

```sql
devs=# select * from company;
 id | name | age | address
----+------+-----+---------
(0 rows)

devs=# select (15+2) as addition;
 addition
----------
       17
(1 row)

devs=# select count(*) as "records" from company;
 records
---------
       0
(1 row)

devs=# select current_timestamp;
        current_timestamp
---------------------------------
 2021-09-06 19:39:44.84129+05:30
(1 row)

devs=# select * from company where age >= 25 and salary >= 65000;

devs=# select * from company where age >= 25 or salary >= 65000;

devs=# select * from company where age is not null;

devs=# select & from company where name like "p%";

devs=# select & from company where name like "p_ul";

devs=# select * from company where salary::text like "200%";

devs=# select * from company where age between 25 and 27;

devs=# select * from company where age in (25, 27);

devs=# select * from company where age not in (25, 27);

devs=# update set salary = 15000 where id=3;

devs=# update company set address="texas", salary=20000 where id = 2;

devs=# delete from company where id = 2;
DELETE 1
```

- addition does not matter, it's just a name.
- "records" does not matter here, it's just a name.
- select current_timestamp; = shows time.

### Foreign Keys:

- connection via customer_id which is why their values should be same to setup the connection

```sql
devs=# create table customers (
devs(# customer_id int generated always as identity,
devs(# customer_name varchar(255) not null,
devs(# primary key(customer_id)
devs(# );
CREATE TABLE

devs=# create table contacts (
devs(# contact_id int not null,
devs(# customer_id int,
devs(# contact_name varchar(255) not null,
devs(# phone varchar(15),
devs(# email varchar(100),
devs(# primary key(contact_id),
devs(# constraint foreign_key_customer
devs(# foreign key(customer_id)
devs(# references customers(customer_id)
devs(# on delete cascade
devs(# );
CREATE TABLE

```

- primary keys = a specific identifier which is used to access its specific keys.

```sql
/***((((( PostgreSQL notes by Rachit Sir )))))****/
/***((((( EVERY THING IS CASE insensitive )))))****/

CREATE USER devnest WITH PASSWORD 'password';         /* Create a new user and assign password to it */
CREATE DATABASE devsDB;                               /* Create a new database, think database as drives (C:, D:) on system */
GRANT ALL PRIVILEGES ON DATABASE devsDB to devnest;   /* Gives permissions to devnest for devsDB */
DROP DATABASE IF EXISTS devsDB;                       /* Deletes the database */
CREATE DATABASE devsDB;

\l;                                                   /* lists all databases */
\c devsDB;                                            /* connects to database */

/* ========================================= Tables ============================ */

CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);                                                    /* Creates table named company */
CREATE TABLE DEPARTMENT(
   ID INT PRIMARY KEY      NOT NULL,
   DEPT           CHAR(50) NOT NULL,
   EMP_ID         INT      NOT NULL
);                                                    /* Creates table named department */

/*** Think of schema like folders inside drive to manage tables better and have people not interfering with others tables ***/
create schema myschema;                               /* Creates Schema */
create table myschema.company(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25),
   SALARY   DECIMAL (18, 2),
   PRIMARY KEY (ID)
);                                                  /* Creates tables in schema (can have same name as parent table/ variable scope) */
select * from myschema.company;
DROP SCHEMA myschema;                               /* Deletes the schema created */
DROP SCHEMA myschema CASCADE;                       /* Deletes the schema as well as everything inside */

/*** Insert Queries examples ***/

DROP TABLE IF EXISTS COMPANY;
CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL,
   JOIN_DATE	    DATE
);
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (1, 'Paul', 32, 'California', 20000.00,'2001-07-13');
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,JOIN_DATE) VALUES (2, 'Allen', 25, 'Texas', '2007-12-13');
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (3, 'Teddy', 23, 'Norway', 20000.00, DEFAULT );
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00, '2007-12-13' ), (5, 'David', 27, 'Texas', 85000.00, '2007-12-13');

/** Select query example **/
SELECT (15 + 6) AS ADDITION ;                         /* Prints sum of 15 and 6 in column addition */
SELECT COUNT(*) AS "RECORDS" FROM COMPANY;            /* Counts all rows and show it inside records column */
SELECT CURRENT_TIMESTAMP;                             /* Prints current time */
select * from COMPANY;                                /* Prints every row of table company */
SELECT * FROM COMPANY WHERE AGE >= 25 AND SALARY >= 65000;    /* Prints all rows with age >= 25 and salary >= 65000 */
SELECT * FROM COMPANY WHERE AGE >= 25 OR SALARY >= 65000;     /* Prints all rows with age >= 25 or salary >= 65000 */
SELECT * FROM COMPANY WHERE AGE IS NOT NULL;                  /* Prints all rows where age is not null */
SELECT * FROM COMPANY WHERE NAME LIKE 'Pa%';                  /* Prints all rows in which name starts with Pa */
SELECT * FROM COMPANY WHERE NAME LIKE 'Pau_';                 /* Prints all rows in which name starts with Pau, has length 4 with last character anything */
SELECT * FROM COMPANY WHERE SALARY::text LIKE '200%';         /* Prints all rows in which slary starts with 200 and convert salary column type to text */
SELECT * FROM COMPANY WHERE ADDRESS  LIKE '%-%';              /* Prints all rows in which address  will have a hyphen (-) inside the text */
SELECT * FROM COMPANY WHERE AGE IN ( 25, 27 );                /* Prints all rows where age is between 25 and 27 */
SELECT * FROM COMPANY WHERE AGE NOT IN ( 25, 27 );            /* Prints all rows where age is not between 25 and 27 */
SELECT * FROM COMPANY WHERE AGE BETWEEN 25 AND 27;            /* Prints all rows where age is between 25 and 27 */
SELECT AGE FROM COMPANY
        WHERE EXISTS (SELECT AGE FROM COMPANY WHERE SALARY > 65000);  /* Prints only age column where salary is > 65000 */
SELECT * FROM COMPANY
        WHERE AGE > (SELECT AGE FROM COMPANY WHERE SALARY > 65000);   /* The following SELECT statement makes use of SQL subquery where subquery finds all the records with AGE field having SALARY > 65000 and later WHERE clause is being used along with > operator to list down all the records where AGE from outside query is greater than the age in the result returned by sub-query */
SELECT * FROM COMPANY LIMIT 4;                                /* fetches only first 4 rows from table */
SELECT * FROM COMPANY LIMIT 3 OFFSET 2;                       /* fetches 5 rows, skips first 2 rows and show the rest */
SELECT * FROM COMPANY ORDER BY NAME DESC;                     /* Prints all rows with name in descending order */

/*** UPDATE QUERY ***/
UPDATE COMPANY SET SALARY = 15000 WHERE ID = 3;               /* Set salary as 15000 in row with id 3 */
UPDATE COMPANY SET ADDRESS = 'Texas', SALARY=20000;           /* Set address as Texas and salary as 20000 to all rows in table */

/*** DELETE QUERY ***/
DELETE FROM COMPANY WHERE ID = 2;                            /* Deletes row with id as 2 */

/* ========================================= Foreign Keys ============================ */
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS contacts;

CREATE TABLE customers(
   customer_id INT GENERATED ALWAYS AS IDENTITY,
   customer_name VARCHAR(255) NOT NULL,
   PRIMARY KEY(customer_id)
);                                                            /* Primary key is the unique identifier of row in table */

CREATE TABLE contacts(
   contact_id INT GENERATED ALWAYS AS IDENTITY,
   customer_id INT,
   contact_name VARCHAR(255) NOT NULL,
   phone VARCHAR(15),
   email VARCHAR(100),
   PRIMARY KEY(contact_id),
   CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customers(customer_id)
);                                                           /* This is how we connect one table to other via foreign key, if we do not add ON DELETE or ON UPDATE, you won't be able to delete the row in parent table which has connection to child table */

INSERT INTO customers(customer_name)
VALUES('BlueBird Inc'),
      ('Dolphin LLC');	   
	   
INSERT INTO contacts(customer_id, contact_name, phone, email)
VALUES(1,'John Doe','(408)-111-1234','john.doe@bluebird.dev'),
      (1,'Jane Doe','(408)-111-1235','jane.doe@bluebird.dev'),
      (2,'David Wright','(408)-222-1234','david.wright@dolphin.dev');

DELETE FROM customers
WHERE customer_id = 1;                                    /* this will give error since we did not mention ON DELETE */

/*** ON DELETE EXAMPLE ***/
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS customers;

/** NOTE : IDENTITY is introduced in postgres version >= 10. For previous versions use serial **/
CREATE TABLE customers(
   customer_id INT GENERATED ALWAYS AS IDENTITY,
   customer_name VARCHAR(255) NOT NULL,
   PRIMARY KEY(customer_id)
);

CREATE TABLE contacts(
   contact_id INT GENERATED ALWAYS AS IDENTITY,
   customer_id INT,
   contact_name VARCHAR(255) NOT NULL,
   phone VARCHAR(15),
   email VARCHAR(100),
   PRIMARY KEY(contact_id),
   CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customers(customer_id)
	  ON DELETE SET NULL
);                                                            /* ON DELETE SET NULL means when you delete row in parent its connected row in child will have null in forign key */

INSERT INTO customers(customer_name)
VALUES('BlueBird Inc'),
      ('Dolphin LLC');	   
	   
INSERT INTO contacts(customer_id, contact_name, phone, email)
VALUES(1,'John Doe','(408)-111-1234','john.doe@bluebird.dev'),
      (1,'Jane Doe','(408)-111-1235','jane.doe@bluebird.dev'),
      (2,'David Wright','(408)-222-1234','david.wright@dolphin.dev');

DELETE FROM customers
WHERE customer_id = 1;

/*** The ON DELETE CASCADE automatically deletes all the referencing rows in the child table when the referenced rows in the parent table are deleted. ***/

DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers(
   customer_id INT GENERATED ALWAYS AS IDENTITY,
   customer_name VARCHAR(255) NOT NULL,
   PRIMARY KEY(customer_id)
);

CREATE TABLE contacts(
   contact_id INT GENERATED ALWAYS AS IDENTITY,
   customer_id INT,
   contact_name VARCHAR(255) NOT NULL,
   phone VARCHAR(15),
   email VARCHAR(100),
   PRIMARY KEY(contact_id),
   CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customers(customer_id)
	  ON DELETE CASCADE
);

INSERT INTO customers(customer_name)
VALUES('BlueBird Inc'),
      ('Dolphin LLC');	   
	   
INSERT INTO contacts(customer_id, contact_name, phone, email)
VALUES(1,'John Doe','(408)-111-1234','john.doe@bluebird.dev'),
      (1,'Jane Doe','(408)-111-1235','jane.doe@bluebird.dev'),
      (2,'David Wright','(408)-222-1234','david.wright@dolphin.dev');

DELETE FROM customers
WHERE customer_id = 1;

SELECT * FROM contacts;
```