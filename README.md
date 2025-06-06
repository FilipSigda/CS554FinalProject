# CS554FinalProject
# Group Name  
**Ducknight**

## Members  
- **Filip Sigda** – 20013812  
- **Konstantinos Mokos** – 20014648  
- **Junran Tao** – 20030943  
- **Haolin Chen** – 20019123  
- **WeiTing Kuo** – 20025644  

---

## Getting Started

### Option 1: Using Docker (Recommended)

1. Make sure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your system
2. Navigate to the project root directory
3. Run the docker-compose command:
   ```
   docker-compose up
   ```
5. Wait for all containers to start (client, server, Redis, MongoDB)
6. Access the application at http://localhost:5173

#### How to Rebuild After updating code

1. Rebuild the server and client containers:
   ```
   docker-compose build --no-cache server client
   ```
2. Restart the containers:
   ```
   docker-compose up --force-recreate --detach server client
   ```

#### Seeding the Database

To initialize the database with sample data when using Docker:

1. Modify the docker-compose.yml file to include the SEED_DB environment variable:
   ```
   server:
     ...
     environment:
       - SEED_DB=true
   ```
2. Rebuild the containers:
   ```
   docker-compose build --no-cache server client
   ```
3. Once the database is seeded, you can set SEED_DB back to false or remove it to prevent reseeding on future restarts
4. All seeded user's passwords are "Password123!"

### Option 2: Manual Setup

Make sure node.js and imagemagick is installed

#### Server Setup
1. Open a terminal in the server directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   The server will run on http://localhost:3000

#### Seeding the Database

To initialize the database with sample data when running locally:

1. Set the SEED_DB environment variable to true when starting the server:
   ```
   # For Windows PowerShell
   $env:SEED_DB="true" ; npm start
   
   # For Windows Command Prompt
   set SEED_DB=true && npm start
   
   # For Linux/Mac
   SEED_DB=true npm start
   ```
2. The seed script will:
   - Truncate all MongoDB collections
   - Empty the uploads folder (while preserving subdirectories)
   - Create accounts for team members
   - Generate sample posts, comments, and conventions
   - Establish following relationships between users
3. After seeding, restart the server normally (without the SEED_DB variable) to prevent reseeding
4. All seeded user's passwords are "Password123!"

#### Client Setup
1. Open another terminal in the client directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the client:
   ```
   npm run dev
   ```
   The client will run on http://localhost:5173

---

## Conventions Showcase Website  

A modern social media platform for discovering conventions, showcasing your art and hobbies, and connecting with like-minded communities.  

For **convention organizers**:
- Create, publish, and manage convention details 
- Add and manage panelists and attendees  
- Engage with fans via posts and updates 
- Promote your events and attract a wider audience

Each convention will have a **feed**, which includes:
- Official updates from organizers  
- Guest and panelist posts
- Community discussions and content  

For **Regular Users**:
- Sign up and link your posts to conventions you are attending  
- Promote your art, merchandise, or cosplay
- Grow your following and connect with fans

**All users** can:
- Create and tag posts under specific conventions 
- Like, comment, and bookmark posts
- Follow creators and keep up with their updates


---

## Course Technologies  

### TypeScript  
A strongly typed programming language built on top of JavaScript.  
- Improves code maintainability  
- Reduces misunderstandings during collaboration  

### Redis (for caching functionality)  
An in-memory key/value store/cache offering high performance.  
- Used to cache data  
- Reduces database calls  
- Decreases response time for repeated requests  

### React  
A component-based front-end framework.  
- Ideal for displaying posts in a feed-style interface  

---

## Outside Technologies  

### [ImageMagick](https://imagemagick.org/index.php)  
A library for manipulating and editing images.  
- Used for image scaling, cropping, format conversion  
- Helps make the feed more uniform and visually appealing  

### [Docker](https://www.docker.com/)  
A platform for developing and shipping applications in portable containers.  
- Provides a consistent development environment  
- Improves collaboration  
- Enables faster development and deployment  
