## This is a backend API that allows user login and the user is able to create a message to encode. Other functionality includes the user to decode messages but the appropriate keyword must be provided 

---

## Getting started

### Installation

1: clone repositor to your local machine

2: in terminal navigate to the cloned repository root directory

3: run 'touch .env'

4: With your system terminal, you will need to install the following packages: <br> express, bcrypt, dotenv, jsonwebtoken, mongoose, and morgan. <br> further dependecies that will need to be install for testing purposes are as follorws: <br> artillery (1.7.9), jest, mongodb-memory-server (8.12.0), and supertest. <br>

5: run 'npm install express bcrypt dotenv jsonwebtoken mongoose morgan'

6: run 'npm install --save-d jest mongodb-memory-server@8.12.0 artillery@1.7.9 supertest'

## progress notes
### 6/23/2023
### realizing that while making the api the loged in user can define their own secret word to use for generating the token, that secret word can than be given to another user and the hashed message can be decoded through jsonwebtoken. how do i point to the user defined secret word in the userSchema model that is created so the secret word can be utilized in the messageSchema model?


make model for message connecting with messageID and user (message should be associated to the logged in user)