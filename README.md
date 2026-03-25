<img src="mypage_images/dashboard.png" alt="Preview of MyPage application" width="100%" />

<div align="center">
  <h2>MyPage: Full-Stack News, Weather, and Personal Dashboard Application</h2>
  <a href="https://www.launchcode.org">
    <img src="https://img.shields.io/badge/for-LaunchCode_St._Louis-5C93CE?style=for-the-badge" alt="badge linking to LaunchCode's website" />
  </a>
  <a href="https://mypagefullstack.netlify.app">
    <img src="https://img.shields.io/badge/Live_Demo-MyPage-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="badge linking to deployed MyPage app" />
  </a>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=333333" alt="React" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=333333" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
  <img src="https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white" alt="Google Fonts" />
  <img src="https://img.shields.io/badge/SweetAlert2-FF6B81?style=for-the-badge&logo=sweetalert2&logoColor=white" alt="SweetAlert2" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven" />
  <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/AWS_Elastic_Beanstalk-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS Elastic Beanstalk" />
  <img src="https://img.shields.io/badge/Amazon_RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white" alt="Amazon RDS" />
  <img src="https://img.shields.io/badge/Amazon_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white" alt="Amazon S3" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/GNews-174EA6?style=for-the-badge&logo=googlenews&logoColor=white" alt="GNews API" />
  <img src="https://img.shields.io/badge/OpenWeather-EE6E4D?style=for-the-badge&logo=openweathermap&logoColor=white" alt="OpenWeather API" />
  <img src="https://img.shields.io/badge/OAuth2-EB5424?style=for-the-badge&logo=oauth&logoColor=white" alt="OAuth2" />
  <img src="https://img.shields.io/badge/Google_Login-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Login" />
  <img src="https://img.shields.io/badge/GitHub_Login-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Login" />
</div>

---

<div align="center">
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#visuals">Key Visuals</a> •
    <a href="#tech">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#database">Database</a> •
    <a href="#api">API</a> •
    <a href="#future">Future Features</a>
</div>

---

<a name="about"></a>
## 💡 About the Project

**MyPage** is a full-stack web application that combines **news, weather, bookmarks, and personalized profile settings** into one dashboard experience.

Users can register with email and password or sign in with **Google** or **GitHub** using OAuth2. Once authenticated, they can browse top headlines by category, save articles as bookmarks, manage their profile, and personalize their weather experience. The application also includes secure password recovery functionality using time-limited reset tokens sent via email.

By default, OAuth users see **Chicago weather** when they first log in. After editing their profile, they can save their preferred city and use that as their default weather location going forward.

The front end is built with **React and Vite**, while the back end is powered by **Spring Boot, Spring Security, Hibernate, and MySQL**. The application also integrates external APIs for news and weather, stores profile images in **Amazon S3**, and is deployed with **Netlify**, **AWS Elastic Beanstalk**, and **Amazon RDS**.

This project was developed as my **LaunchCode Unit 2 full-stack capstone project** and reflects my interest in building secure, user-focused applications with real-world API integrations and cloud deployment.

---


<a name="features"></a>
## 🎨 Features

### Authentication and User Access
- **User Registration and Login:** Secure account creation and login with JWT-based authentication
- **OAuth2 Login:** Sign in with Google or GitHub
- **Protected Experience:** The application is designed for authenticated users
- **Session-Based Personalization:** Users can access features tied to their own account and saved preferences
- **Forgot Password:** Users can request a password reset link via email  
- **Secure Password Reset:** Users can reset their password using a time-limited token  

### News Features
- **Top Headlines by Category:** Browse news by category from the dashboard
- **Article Bookmarking:** Save and remove articles from bookmarks
- **Bookmark Persistence:** Bookmarked articles are stored in the database for each user
- **Paginated Bookmarks Modal:** Bookmarks are shown with pagination for a cleaner UI

### Weather Features
- **Default Chicago Weather for OAuth Users:** New OAuth users see Chicago weather by default
- **Preferred City Support:** Users can update their profile and save a city as their default weather location
- **Weather Search:** Users can search weather for cities
- **Weather History:** Recent weather searches are saved for authenticated users
- **Weather History Management:** Users can delete individual weather history entries or clear all saved weather history

### Profile Features
- **Profile Editing:** Users can update profile details
- **Profile Picture Upload:** Users can upload a profile image
- **Cloud Image Storage:** Profile images are stored in Amazon S3

### Security and Backend Features
- **Spring Security Integration:** Secures API routes and authenticated user flows
- **JWT Authentication:** Token-based authentication for secure sessions
- **OAuth2 Integration:** Supports Google and GitHub sign-in flows
- **RESTful API Design:** Organized API structure for authentication, news, weather, bookmarks, and profile features
- **Cloud Deployment:** Front end deployed on Netlify and back end deployed on AWS Elastic Beanstalk

 ### Responsive Design
- **Desktop, iPad, and Mobile Support:** The application is designed to provide a responsive experience across multiple screen sizes
- **Adaptive Layouts:** News, weather, profile, and bookmark views adjust for usability on large screens, tablets, and phones
- **Improved User Experience:** Responsive styling helps maintain readability, navigation, and interaction across devices 

---


<a name="visuals"></a>
## 📸 Key Visuals

### Wireframes

<details>
  <summary>Click here to toggle diagrams.</summary><br />
  <em>Click on image to view in Figma.</em>
  <a href="https://www.figma.com/design/Tlv5azmgUYGNpkvTsIw8N0/My-Page---unit-2---The-source-of-wisdom?node-id=0-1&t=ORERwAiUDJ4jMUNf-1"><img src="mypage_images/wireframe.png" alt="Wireframe Diagram" /></a>
</details>

### Preview of UI

### Responsive Design Preview

<details>
  <summary>Responsive Views for desktop, iPad, and mobile layouts.</summary>
  <img src="mypage_images/dashboard.png" alt="Screenshot of MyPage desktop view" width="700px" />
  <img src="mypage_images/ipad_mini.png" alt="Screenshot of MyPage iPad view" width="500px" />
  <img src="mypage_images/mobile.png" alt="Screenshot of MyPage mobile view" height="500px" />
</details>

#### AUTHENTICATION

<details>
  <summary>Login, Register,OAuth and Password Reset</summary>
  <img src="mypage_images/login_page.png" alt="Screenshot of login page" height="500px" />
  <img src="mypage_images/user_registration.png" alt="Screenshot of register page" height="500px" />
  <img src="mypage_images/google_oauth.png" alt="Screenshot of google login page" height="500px" />
  <img src="mypage_images/github_oauth.png" alt="Screenshot of github login page" height="500px" />
  <img src="mypage_images/forgot_password.png" alt="forgot password page" height="500px" />  
  <img src="mypage_images/password_reset_email.png" alt="Screenshot of password reset email page" height="500px" />  
  <img src="mypage_images/reset_password.png" alt="Screenshot of reset password page" height="500px" />  
</details>

#### DASHBOARD AND CONTENT

<details>
  <summary>News and Weather</summary>
  <img src="mypage_images/dashboard.png" alt="Screenshot of news page" width="700px" />
  <img src="mypage_images/article.png" alt="Screenshot of article modal" width="700px" /> 
</details>

<details>
  <summary>Bookmarks</summary>
  <img src="mypage_images/bookmarks.png" alt="Screenshot of bookmarks modal" width="700px" />
</details>

<details>
  <summary>Contact Us</summary>
  <img src="mypage_images/contact_form.png" alt="Screenshot of Contact Us form" width="700px" />
</details>



#### PROFILE

<details>
  <summary>Profile Management</summary>
  <img src="mypage_images/edit_profile.png" alt="Screenshot of profile page" width="700px" />
</details>

---

<a name="tech"></a>
## 🛠️ Tech Stack

This project uses a modern full-stack architecture with a React front end, a Spring Boot REST API, MySQL persistence, third-party API integrations, and cloud deployment.

### Front End

| Technology | Description |
| ---: | :--- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=20232A) | Component-based UI library used to build the application interface |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=323330) | Core language used for application logic and interactivity |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Development tooling for fast builds and hot module replacement |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | Client-side routing for page navigation |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) | Used for communication with the back-end API |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) | Custom styling, layout, and responsive design |
| ![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white) | Icon library used throughout the interface |
| ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white) | Typography customization for the application UI |
| ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF6B81?style=for-the-badge&logo=sweetalert2&logoColor=white) | User-friendly alerts and feedback messages |

### Back End, Security, and Database

| Technology | Description |
| ---: | :--- |
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) | Main back-end programming language |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) | Framework used to build the REST API and application services |
| ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white) | Handles authentication, authorization, and protected routes |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) | Token-based authentication for secure user sessions |
| ![OAuth2](https://img.shields.io/badge/OAuth2-EB5424?style=for-the-badge&logo=oauth&logoColor=white) | Enables Google and GitHub login integration |
| ![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white) | ORM for interacting with the relational database |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) | Relational database used for users, bookmarks, roles, and weather history |
| ![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white) | Dependency management and build tool |

### APIs, Cloud, and Deployment

| Technology | Description |
| ---: | :--- |
| ![GNews](https://img.shields.io/badge/GNews-174EA6?style=for-the-badge&logo=googlenews&logoColor=white) | Provides top headlines and article data |
| ![OpenWeather](https://img.shields.io/badge/OpenWeather-EE6E4D?style=for-the-badge&logo=openweathermap&logoColor=white) | Provides weather data for default and user-selected cities |
| ![Amazon S3](https://img.shields.io/badge/Amazon_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white) | Stores uploaded profile images |
| ![AWS Elastic Beanstalk](https://img.shields.io/badge/AWS_Elastic_Beanstalk-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white) | Hosts the Spring Boot back end |
| ![Amazon RDS](https://img.shields.io/badge/Amazon_RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white) | Managed MySQL database in production |
| ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) | Hosts the React front end |

---

<a name="installation"></a>
## 🚀 Prerequisites & Installation

> [!NOTE]
> To run this project locally, you will need:
> - Node.js
> - npm
> - Java JDK
> - Maven
> - MySQL Server
> - GNews API key
> - OpenWeather API key
> - Google OAuth credentials
> - GitHub OAuth credentials
> - AWS configuration if testing S3 uploads locally

---

### 🔧 Setup Steps

#### 1. Clone the repository

    git clone https://github.com/your-username/your-repository-name.git
    cd spring-news-app

#### 2. Create the database

    CREATE DATABASE mypage_db;

#### 3. Configure backend environment variables

   spring.application.name=spring-news-app
   
#### DATABASE CONFIG
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=5000


#### JWT CONFIG
jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

logging.level.org.springframework.security=DEBUG

#### News and Weather API key
gnews.api.key=${GNEWS_API_KEY}  # set in environment variable
gnews.api.url=https://gnews.io/api/v4

weather.api.key=${WEATHER_KEY}

file.upload-dir=uploads

#### Gmail App setup
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=vijiramu@gmail.com
spring.mail.password=${GMAIL_APP_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
app.frontend.url=https://mypagefullstack.netlify.app

#### Google OAuth
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
spring.security.oauth2.client.registration.google.scope=openid,profile,email

#### GitHub OAuth
spring.security.oauth2.client.registration.github.client-id=${GITHUB_CLIENT_ID}
spring.security.oauth2.client.registration.github.client-secret=${GITHUB_CLIENT_SECRET}
spring.security.oauth2.client.registration.github.scope=read:user,user:email

#### Profile image file storage
aws.s3.bucket-name=${AWS_S3_BUCKET_NAME}
aws.region=${AWS_REGION}

#### Fix OAuth redirect URI behind proxy
server.forward-headers-strategy=framework

#### Google OAuth callback
spring.security.oauth2.client.registration.google.redirect-uri=https://api.mypagebackend.com/login/oauth2/code/{registrationId}

#### GitHub OAuth callback
spring.security.oauth2.client.registration.github.redirect-uri=https://api.mypagebackend.com/login/oauth2/code/{registrationId}



#### 4. Run the backend

    mvn spring-boot:run

    http://localhost:8080

#### 5. Set up and run the frontend

    cd ../client
    npm install

    VITE_API_BASE_URL=http://localhost:8080/api
    VITE_BACKEND_URL=http://localhost:8080

    npm run dev

    http://localhost:5173

   ---

<a name="database"></a>
## 🗄️ Database Structure

This project uses a **MySQL relational database** designed to support authentication, personalization, and user-driven features such as bookmarks and weather history.

### Core Entities

- **User** — stores user credentials, profile details, preferred city/country, and OAuth provider info  
- **Role** — defines user roles (e.g., ROLE_USER, ROLE_ADMIN)  
- **Bookmark** — stores articles saved by users  
- **WeatherSearchHistory** — tracks previously searched cities  
- **PasswordResetToken** — stores secure, time-limited tokens for password reset functionality

### Relationships

1. **User ↔ Role**: Many-to-Many  
2. **User ↔ Bookmark**: One-to-Many  
3. **User ↔ WeatherSearchHistory**: One-to-Many  
4. **User ↔ PasswordResetToken**: One-to-One (or One-to-Many depending on lifecycle)


### Entity Relationship Diagram (ERD)

<details>
  <summary>Click here to toggle view of ERD</summary><br />
  <em>>Click on image to view ERD in dbdiagram.io</em><br />
  <a href="https://dbdiagram.io/d/MyPageERD-69af432e77d079431b41100e"><img src="mypage_images/ERD.png" alt="Entity Relationship Diagram" /></a>
</details>

---

<a name="api"></a>
## ⚙️ API Endpoints

The following RESTful endpoints manage authentication, news, weather, and user-specific data.

> **Note:** Most endpoints require a valid JWT in the `Authorization` header.

---

### 🔐 Authentication

| HTTP Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| 🟡 `POST` | `/api/auth/register` | Register a new user | 🌎 Public |
| 🟡 `POST` | `/api/auth/login` | Authenticate user and return JWT | 🌎 Public |
| 🟢 `GET` | `/api/auth/oauth-user` | Get authenticated OAuth user details | 🔐 Authenticated |
| 🟡 `PUT` | `/api/auth/update-profile` | Update user profile details (name, city, profile picture, etc.) | 🔐 Authenticated |

### 🔑 Password Reset

| HTTP Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| 🟡 `POST` | `/api/auth/forgot-password` | Send password reset email with token | 🌎 Public |
| 🟡 `POST` | `/api/auth/reset-password` | Reset password using token | 🌎 Public |

---

### 📰 News

| HTTP Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| 🟢 `GET` | `/api/news/top?category=...` | Get top headlines by category | 🔐 Authenticated |

---

### 🌤️ Weather

| HTTP Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| 🟢 `GET` | `/api/weather` | Get weather for a searched city | 🔐 Authenticated |
| 🟢 `GET` | `/api/weather/me` | Get weather for user's preferred city | 🔐 Authenticated |
| 🟢 `GET` | `/api/weather/history` | Retrieve weather search history | 🔐 Authenticated |
| 🔴 `DELETE` | `/api/weather/history/{id}` | Delete a weather history record by ID | 🔐 Authenticated |
| 🔴 `DELETE` | `/api/weather/history` | Delete all weather history for the current user | 🔐 Authenticated |

---

### 🔖 Bookmarks

| HTTP Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| 🟡 `POST` | `/api/bookmarks/add` | Add a bookmarked article | 🔐 Authenticated |
| 🔴 `DELETE` | `/api/bookmarks/delete?url=...` | Delete bookmark by URL | 🔐 Authenticated |
| 🔴 `DELETE` | `/api/bookmarks/delete-all` | Delete all bookmarks | 🔐 Authenticated |
| 🟢 `GET` | `/api/bookmarks/get` | Get paginated bookmarks | 🔐 Authenticated |
| 🟢 `GET` | `/api/bookmarks/getAll` | Get all bookmarked URLs | 🔐 Authenticated |

---

### ❤️ Health Check

| HTTP Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| 🟢 `GET` | `/api/health` | Application health check endpoint | 🌎 Public |

---

<a name="future"></a>
## 🔮 Future Features

Several enhancements are planned to extend functionality and improve user experience.

### 🔐 Security Enhancements
- Implement **refresh tokens** for longer-lived sessions  
- Transition to **httpOnly cookies** for improved security  

### 🤖 AI-Powered Features
- AI-generated **news summaries and insights**  
- AI-based **weather recommendations** based on user preferences  

### 📈 Product Improvements
- Expand the **calendar feature** with backend integration  
- Add **advanced news filtering and search capabilities**  
- Improve **profile customization options**  
- Enhance bookmark organization with **folders or tags**  

---

## 🧑‍💻 Author

**Vijayalakshmi Ramu** - [@ GitHub](https://github.com/viji-qmofi) - [LinkedIn](https://www.linkedin.com/in/vijiramu)
