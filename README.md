# Organize Power
An Operation Spark Greenfield Project developed by
- [Clayton Christensen](https://github.com/cchristenson-opspark)
- [Kris Mason](https://github.com/masonkristopher)
- [Neisha Rose](https://github.com/Neisha1618)
- [Will Preble](https://github.com/wpreble1)
- [Jerry McDonald](https://github.com/JerryMcDonald)

Current Deployment via [Google CLoud](https://cloud.google.com/)
- https://op-version-3.uc.r.appspot.com/#/explore

## Motivation
People across the United States are participating in active democracy at unprecedented levels, generously donating their money, time, and energy to protesting existing power structures and building a better world. But systemic and structural forces are difficult to overcome. The fight for justice requires sustained organizing, coordination, and momentum.

Our app, Organize Power, helps bridge the gap between the desire for change and impactful action. We encourage users to engage directly with the movements they are inspired by and start their own movements. We give organizers the tools to encourage their followers to pressure public figures, attend events, and donate money to grassroots causes.

## Contributing to Development
- Fork repository and clone locally
- Install dependencies inside project folder
```
npm install
```
- Create a feature branch
```
git checkout -b new-feature
```
- Add the following variables to .env
```
TWILIO_SID=<your Twilio sid here>
TWILIO_AUTH_TOKEN=<your Twilio auth token here>
```
- Start mysql, and inside the mysql shell, create the op database
```
mysql> CREATE DATABASE op;
```
- From the root of the project folder, create the database tables
```
node server/db/index.js
```
- From the root of the project folder, seed the database with sample data (if desired)
```
node server/db/seedData.js
```
- Start the development build
```
npm run start:client
```
- Start the server
```
npm start
```
- Open localhost:8080 in browser to view application
```
localhost:8080
```
- Make edits, stage changes, and make a commit
```
git add newfile.js
git commit -m "Add new feature"
```
- Push feature branch to origin
```
git push origin new-feature
```
- Submit a pull request!

## Technology Stack
### Front-End
- [React 16.13](https://reactjs.org/docs/react-api.html) - A JavaScript library for building user interfaces.
- [React Router 5.2](https://reacttraining.com/react-router/) - React Router is a collection of navigational components that compose declaratively with your application.
- [Tailwind CSS 1.4.6](https://tailwindcss.com/docs/installation) - A utility-first CSS framework for rapidly building custom designs.
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.
- [Moment.js 2.27](https://momentjs.com/docs/) - Parse, validate, manipulate,
and display dates and times in JavaScript.

### Server
- [Node.js 8.17](https://nodejs.org/en/docs/) - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
- [Express 4.17](https://expressjs.com/en/api.html) - Fast, unopinionated, minimalist web framework for Node.js.

### Database
- [MySQL](https://dev.mysql.com/doc/) - MySQL is an open-source relational database management system.
- [Sequelize 5.21.12](https://sequelize.org/v5/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

### Authentication
- [Passport](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js.

### Deployment
- [Google Cloud Platform](https://cloud.google.com/) - Google Cloud Platform, offered by Google, is a suite of cloud computing services.

### External APIs
- [Twilio Programmable SMS API]() - Twilio's Programmable SMS API helps you add robust messaging capabilities to your applications.

### Linter
- [ESLint ](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.


## Development Team
- [Clayton Christensen](https://github.com/cchristenson-opspark)
- [Kris Mason](https://github.com/masonkristopher)
- [Neisha Rose](https://github.com/Neisha1618)
- [Will Preble](https://github.com/wpreble1)

## License

The MIT License (MIT)

Copyright (c) 2020 Clayton Christensen, Kris Mason, Neisha Rose, Will Preble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
