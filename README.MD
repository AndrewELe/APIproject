## This is a backend API that allows user login and the user is able to create a message to encode. Other functionality will include the user ability to decode messages but the appropriate keyword must be provided 

 https://ibb.co/rMsv3f6
 https://ibb.co/dJY7JnR


![alt text] (https://i.ibb.co/P4QtMzh/api-diagram-flow.jpg)
![alt text] (https://i.ibb.co/Dg2Lg3Z/excalidraw-final.png)
---
<div align="center"> 

## Getting started


Requirements: node.js and nodemon(globally installed) postman(for unit API testing) and VS Code
</div>

<div align="center">

### Installation

</div>

---

1: clone repository to your local machine with through either the github "<>code" button on the user interface or through your local computer terminal using the command<br> `git clone git@github.com:AndrewELe/APIproject.git` <br>

2: in terminal navigate to the cloned repository root directory

3: run <br> `touch .env` <br>

3a: in terminal run <br> `code .`<br> and navigate to the file to alter the .env file and include

        MONGO_URI=mongodb+srv://<username>:<password>@cluster0.y803gsb.mongodb.net/APIproject?retryWrites=true&w=majority
        SECRET=<secret word hash>

NOTE: replace username and password with your own credentials, navigate to `https://emn178.github.io/online-tools/sha256.html`<br> to make your own secret word hash (it should be a string of random characters)

4: With your system terminal, you will need to install the following packages: <br> express, bcrypt, dotenv, jsonwebtoken, mongoose, and morgan. <br> further dependecies that will need to be install for testing purposes are as follorws: <br> artillery (1.7.9), jest, mongodb-memory-server (8.12.0), and supertest. <br>

5: run `npm i` to install these packages

6: use postman with the following url <br> `localhost:3000/(any defined additional routing)/:id` <br> to run and test the api on your local machine.

6a: in postman be sure to create a new user json object and capture the jsonwebtoken that is returned. this webtoken will need to be added under the postman authorization token area with the drop selection being "token bearer"

6b: once the token has been added utilizing the rest of the routes should function as expected

<div align="center">

### Built with

</div>

---

this project was built with the following technologies <br>
node.js, javascript, mongoDB <br>

<div align="center">

### front end usage example

</div>

---

below are indications of how the api is designed to be used in conjunction of a front end<br>
 ( note to self plug in image here for wireframing and flow map)

<div align="center">

### future considerations and implimentations

</div>

---

looking forward, some of the icebox items that are intended to be added as features to the backend API

- [] include login and logout functionality
- [] include decoding functionality
- [] deploy to web server for online access to allow usage of the API without having to clone repositories

<div align="center">

## Acknoledgements

</div>

---

Arthur, Teo, Josh and August (General Assembly Instructors and TA team)
Jeff (General Assembly Cohort fellow)
