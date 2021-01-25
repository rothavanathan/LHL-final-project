# Layers

Layers a music application that allows a user to isolate stems of a song for teaching or recreational purposes. It is a sleek and responsive app that uses a React JS frontend with an Express JS and Node JS backend. 

The main functionality of the app is the isolation of stems in a song to use within a project i.e. Billy Learning Bass from Another One Bites the Dust. Projects can be located in isolation or within collections that help users organise workflow. You can also make notes on projects to further optimise organisation. Account management is included and users can store and persist their work. All data is stored and retrieved from a database API using PostgresSQL.

Technologies used include React, Material UI, WebPack, Babel, Axios client-side, Node.js, Express.js, Postgres server-side, and WebPack Dev Server.

Available Songs:
```sh
- Burial Ground by Wily
- Lisztomania by Phoenix
- 1901 by Phoenix
- Fences by Phoenix
- Armistice by Phoenix
- Another One Bites the Dust by Queen
```

This project was created by Romesh Thavanathan, Laura Tannahill and Kagiso Mashigo.

Deploy Link: https://layers-irl.netlify.app/

### Demo
!["Demo"](https://github.com/rothavanathan/LHL-final-project/blob/master/client/docs/layers.gif?raw=true)

## Final Product Screenshots
### Landing Page
!["Landing Page"](https://github.com/rothavanathan/LHL-final-project/blob/readme/client/docs/Entry.png?raw=true)
### User Homepage
!["User Homepage"](https://github.com/rothavanathan/LHL-final-project/blob/readme/client/docs/Home.png?raw=true)
### Search
!["Search"](https://github.com/rothavanathan/LHL-final-project/blob/readme/client/docs/Search.png?raw=true)
### Song Preview
!["Song Preview"](https://github.com/rothavanathan/LHL-final-project/blob/readme/client/docs/Song%20Preview.png?raw=true)
### Player
!["Project"](https://github.com/rothavanathan/LHL-final-project/blob/readme/client/docs/Player.png?raw=true)
### Notes Section
!["Notes Section"](https://github.com/rothavanathan/LHL-final-project/blob/readme/client/docs/Notes.png?raw=true)

# Development:

## Getting Started

Install all dependencies (using the `npm install` command from within both client and server).

## Directory Structure:

### Client:

```sh
./                 Root folder
./client           Main client folder
./docs             Project documentation and screenshots
./public           Static files served to the client
./public/icons     Static icons used on the app
./src              Client source code
./src/components   React components
./src/hooks        React hooks
./src/public       Logo files
```

### Server:

```sh
./                 Root folder
./server           Main server folder
./bin              Contains port management file and db reset
./db               Contains schema, seeds and db index
./lib              db connnection file
./src              Server source code
./src/helpers      Helper functions
./src/routes       Routing logic
```

## Dependencies

Layers requires Node.js and PostgresSQL and the following dependencies:

### Client:

```sh
- material-ui/core            4.11.2
- material-ui/icons           4.11.2
- testing-library/jest-dom    5.11.9
- testing-library/react       11.2.3
- testing-library/user-event  12.6.0
- axios                       0.21.1
- classnames                  2.2.6
- eventemitter                0.3.3
- node-sass                   5.0.0
- react                       17.0.1
- react-dom                   17.0.1
- react-router-dom            5.2.0
- react-scripts               4.0.1
- react-share                 4.3.1
- wavesurfer.js               4.4.0
- web-vitals                  0.2.4
```

### Server:

```sh
- express                     4.16.1
- bcrypt                      5.0.0
- body-parser                 1.19.0
- cookie-parser               1.4.4
- cookie-session              1.4.0
- cors                        2.8.5
- debug                       2.6.9
- morgan                      1.9.1
- pg                          8.5.1
- pg-native                   3.0.0
```

## Dev Dependencies

```sh
- dotenv                      8.2.0
- nodemon                     2.0.7
```

## Running Webpack Development Server and Express Server

```sh
npm run start
npm run nodemon
```

Don't forget to have fun!