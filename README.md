# Memories
A social media website which helps users to share memorable events. Users can signup and/or login using their email id or google oath. Once signed in, they can create, edit, delete and like posts. 

#### Running the website
1. Make a .env file in both client and server folder. Refer .env.example for the same.
2. Run the following commands for both client and server:
    - npm i
    - npm start

### Backend
- This project uses Express for the backend framework and, MongoDB as the database and Mongoose as the ODM. It has two collections, one for storing the posts and the other for storing the user credentials. Sensitive data like password is stored in a hashed form using 'bcrypt'.
- For authentication, JWT is used which creates(sign), decodes and verifies the token.

### Frontend
- The frontend uses React along with MUI for the components. The state is managed using React Redux which maintains a global store and the state variables are accessed using 'useSelector' hook. For updating a state variable, we use the 'dispatch' method which dispatches an action. An action has a type and a payload(the data to be updated). A reducer then updates the global store using the dispatched action.
- For authentication, Google OAuth2 is used via the package '@react-oauth/google'. In addition to this custom authentication is also implememnted using JWT.
- The frontend communicates with the backend using Axios.

### Screenshot
- When not logged in

![image](https://user-images.githubusercontent.com/80119548/205433781-b5c17d5e-2aa0-4ea5-830d-2c0f05dc1880.png)


- Sign Up

![image](https://user-images.githubusercontent.com/80119548/205433799-7401efad-98dd-4d2f-a7cb-3ac00b4c621f.png)


- Sign In

![image](https://user-images.githubusercontent.com/80119548/205433808-3f9bca88-dfcf-4dce-8a29-770c5abb6e63.png)


- Creating a post

![sunset create](https://user-images.githubusercontent.com/80119548/205433601-54ef7185-c803-433e-b90c-0b21bad15570.png)
![sunset](https://user-images.githubusercontent.com/80119548/205433619-e7475b8e-e5e4-418b-aa8a-cbe2c0bead6d.png)


- Editing a post

![image](https://user-images.githubusercontent.com/80119548/205433347-dfc4fa86-45e8-4594-be9d-9c6f024e7324.png)
![image](https://user-images.githubusercontent.com/80119548/205433746-dc75c8e7-fd24-4f61-8f10-b02e38c49aae.png)


- Database
    - Posts
    ![image](https://user-images.githubusercontent.com/80119548/205434154-395891e4-ce1e-4466-861d-fe3a62bf45fd.png)
    
    - Users
    ![Screenshot 2022-12-03 150342](https://user-images.githubusercontent.com/80119548/205434240-b33700e0-f3f4-4b52-b3fe-02bc05de9617.png)




### Features
- Authentication
    - Custom Login/Signin using JWT
    - Google OAuth2
- Creating posts
- Editing and deleting posts
- Liking posts
- Posts can be only viewed if not logged in
- Once logged in, the session is active for 1 hour

### Tech Stack Used
- React
- MUI
- Express.js
- Node.js
- MongoDB

### Future Scope
Revamping the UI and adding features such as comments, separate feed for others posts and tagging other users.

### Authors
- [Aakash Wagle](https://github.com/aakash-wagle)
- [Anjali Shukla](https://github.com/Anjali020403)
