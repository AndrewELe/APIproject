## This is a backend API that allows user login and the user is able to create a message to encode. Other functionality includes the user to decode messages but the appropriate keyword must be provided 

---

## Getting started

Requirements: node.js and nodemon(globally installed) postman(for unit API testing)

### Installation

1: clone repositor to your local machine

2: in terminal navigate to the cloned repository root directory

3: run `touch .env`

3a: in terminal run `code .` to alter the .env file and include

        MONGO_URI=mongodb+srv://<username>:<password>@cluster0.y803gsb.mongodb.net/APIproject?retryWrites=true&w=majority
        SECRET=<secret word hash>

NOTE: replace username and password with your own credentials, navigate to `https://emn178.github.io/online-tools/sha256.html` to make your own secret word hash (it should be a string of random characters)

4: With your system terminal, you will need to install the following packages: <br> express, bcrypt, dotenv, jsonwebtoken, mongoose, and morgan. <br> further dependecies that will need to be install for testing purposes are as follorws: <br> artillery (1.7.9), jest, mongodb-memory-server (8.12.0), and supertest. <br>

5: run `npm i` to install these packages

6: use postman with the following url `localhost:3000/` to run and test the api on your local machine.

            

## progress notes
### 6/23/2023
### realizing that while making the api the loged in user can define their own secret word to use for generating the token, that secret word can than be given to another user and the hashed message can be decoded through jsonwebtoken. how do i point to the user defined secret word in the userSchema model that is created so the secret word can be utilized in the messageSchema model?


make model for message connecting with messageID and user (message should be associated to the logged in user)