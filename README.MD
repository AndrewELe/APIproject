## This is a backend API that allows user login and the user is able to create a message to encode. Other functionality will include the user ability to decode messages but the appropriate keyword must be provided 

---

<div align="center"> 

## Getting started


Requirements: node.js, npm, nodemon(globally installed), postman(for unit API testing) and VS Code
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

NOTE: replace username and password with your own credentials, navigate to `https://emn178.github.io/online-tools/sha256.html` in your browser of choice to make your own secret word hash (it should be a string of random characters)

4: With your system terminal, you will need to install the following packages: <br> express, bcrypt, dotenv, jsonwebtoken, mongoose, and morgan. <br> further dependecies that will need to be install for testing purposes are as follorws: <br> artillery (1.7.9), jest, mongodb-memory-server (8.12.0), and supertest. <br>

5: run `npm i` to install these packages

6: in terminal run `npm run dev` to start server and verify that the API is running and connected to the mongoDB server

7: in a second terminal run `npm run tests` to do a quick verification that all routing and functionality is working

8: use postman with the following url <br> `localhost:3000/(any defined additional routing)/(:id if required for specific routing)` <br> to run and test the api on your local machine.

*see diagram below for required fields for the json object to send through postman*

<div align="center">

<img src="https://i.ibb.co/NjDgFpq/routing-flow.png"> 

<img src="https://i.ibb.co/P4QtMzh/api-diagram-flow.jpg">

</div>

8a: in postman be sure to create a new user json object and capture the jsonwebtoken that is returned. this webtoken will need to be added under the postman authorization token area with the drop selection being "token bearer"

8b: once the token has been added utilizing the rest of the routes should function as expected 

9: artillery will test the amount of clients attempting to access the API, you can run this test by typing the following in your terminal `npm run load`

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

<img src="https://i.ibb.co/Dg2Lg3Z/excalidraw-final.png">

<div align="center">

### future considerations and implimentations

</div>

---

looking forward, some of the icebox items that are intended to be added as features to the backend API

- [] include login and logout functionality
- [] include decoding functionality *see notes below*
- [] deploy to web server for online access to allow usage of the API without having to clone repositories

multiple attempts were made to create functionality of decoding the message. JSON.parse method appears to send the encrypted message to the messages object as a string but decoding the string continually returns an empty string. upon looking for documentation i had stumbled accross comments that this is a known problem for the current version of crypto-js. below is a link to the development communtiy indicating the issue.

https://github.com/imchintan/react-native-crypto-js/issues/6

revisitation of the encode and decode methods will be required, methods will be attempted using ATOB and BTOA methods

<div align="center">

## Acknoledgements

</div>

---

Arthur, Teo, Josh and August (General Assembly Instructors and TA team)
Jeff (General Assembly Cohort fellow)
