# Building a basic API for message encoding, will later be connecting this API to a front end to display the base64 enconded text in "Aurebesh" the Star Wars common written language.

### the user will need to log in to the server using a hashed password and the encoded message will be specfic to each user

## progress notes
### 6/23/2023
### realizing that while making the api the loged in user can define their own secret word to use for generating the token, that secret word can than be given to another user and the hashed message can be decoded through jsonwebtoken. how do i point to the user defined secret word in the userSchema model that is created so the secret word can be utilized in the messageSchema model?


make model for message connecting with messageID and user (message should be associated to the logged in user)