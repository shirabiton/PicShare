# PicShare - a collaborative photography platform
## Overview
This platform is a collaborative site about photography.<br>
You can get recommendations from posts regarding: professional photographers, special locations for photography, photography accessories for rent/sale, as well as photography tips from the experts.<br>
Users who are registered to the site can post recommendations on these topics, attach a picture to the post for illustration, as well as comment on existing posts and rate them.<br>
In the profile, user can see his/her personal details, all the posts he/she has uploaded, view them, edit or delete them.<br>
And there are options of disconnecting from the account and deleting the account.<br><br>
## Features
- Registration/login to the system by full name, email address and password of the account.
- Viewing the user's profile, where his/her personal details and the posts he/she uploaded are listed. It is possible to view the posts of the profile, edit and delete them. User also can disconnect from the account or delete it permanently.
- Viewing the uploaded posts, even someone who is not registered as a user may view the posts.
- Writing a post by category, along with a picture.
- Response and rating to an existing post.
  <br><br>
## Use Of Technologies
- **Server side:** Java (Spring Boot)
- **Client side:** React (Redux)
- **Design libraries:** MUI (Material UI), SweetAlert2
- **Database:** H2 (for data storage only)
<br>

 ## Installation
First clone the file to your local computer by the following command in the command line of the desired folder: 
```bash
git clone https://github.com/shirabiton/PicShare.git
```

### Server-side installation:
Open the project in the IntelliJ IDEA or Eclipse workspace and run the server.
Then, open the browser URL:
```bash
http://localhost:8585/h2-console
```
There you can see the database saved in tables.
### Client-side installation:
Open the command line of the client-side folder in the project, and write:
```bash
code .
```
Then type enter. This is how the project will open for you in Visual Studio Code. <br>
Now run the project by the command in terminal:
```bash
npm run dev
```
<br>

## External Dependencies
As mentioned, the MUI (Material UI) library is installed on the client-side, it is a React UI-library.
We will install it by the following command in the terminal:
```bash
npm install @mui/material @emotion/react @emotion/styled
```
And there is use of the SweetAlert2 library that provides well-designed and responsive alert messages.
We will install it by the command:
```bash
npm install sweetalert2
```
Or alternatively, easily install any installation in the project by this command:
```bash
npm install
```
<br>

## How to use
From the home page you can log in/register by clicking on: "התחבר/הירשם" in the header. <br>
We can navigate to "קצת עלינו" to the page about the site, <br>
and, navigate to our profile by clicking on our account avatar. <br>
Clicking on "פוסטים" will lead us to a database of uploaded posts, in the sidebar we will navigate through the various categories for photography recommendations. <br>
You can search for posts by quickly searching for the post title in the header of the site. <br>
At each stage, clicking on the logo will take us to the home page, and on each page if we scroll down we can go to the top of the page by clicking on an up-arrow icon. <br>
Clicking on a post will lead us to the full post page, at the top of the post we can see who the owner of the post is, then the image and the text of the post, further down the page the rating and comments will be displayed, <br>
There, as users we will be allowed to rate and comment on the post. <br>
There is a floating button with a plus icon on the posts page, through which we can upload new posts and attach a picture to them.<br><br>
## A Visual Guide
Homepage:<br><br>
![Homepage](web/src/Docs/Screenshots/home-page.png)<br><br>
Registration:<br><br>
![Registration](web/src/Docs/Screenshots/signin.png)<br><br>
![Successfully Added](web/src/Docs/Screenshots/signin-succeed.png)<br><br>
Log In:<br><br>
![Log In](web/src/Docs/Screenshots/login.png)<br><br>
![You are logged in](web/src/Docs/Screenshots/login-succeed.png)<br><br>
About Us:<br><br>
![About Us](web/src/Docs/Screenshots/about.png)<br><br>
Post A Recommendation:<br><br>
![Post A Recommendation](web/src/Docs/Screenshots/add-post.png)<br><br>
![Successfully Posted](web/src/Docs/Screenshots/add-post-succeed.png)<br><br>
All Posts:<br><br>
![All Posts](web/src/Docs/Screenshots/posts.png)<br><br>
Quick Search Of The Posts:<br><br>
![Post Search](web/src/Docs/Screenshots/search.png)<br><br>
Post Details:<br><br>
![Post Details](web/src/Docs/Screenshots/show-post.png)<br><br>
Comment:<br><br>
![Comment](web/src/Docs/Screenshots/add-comment.png)<br><br>
The Comments To The Post:<br><br>
![The Comments To The Post](web/src/Docs/Screenshots/comments.png)<br><br>
User's Profile:<br><br>
![User's Profile](web/src/Docs/Screenshots/profile.png)<br><br>
Profile's Posts:<br><br>
![Profile's Posts](web/src/Docs/Screenshots/profile-post.png)<br><br>
