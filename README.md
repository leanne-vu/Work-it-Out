# :muscle:	 <span style="color:#ef233c">Work it Out :muscle:
<img src="https://media.tenor.com/ZFUJ2eZcm2IAAAAd/work-out-excercise.gif" align="right"
     alt="Spongebob lifting" width="250" height="178">


Work it Out is a full-stack web application for  fitness enthusiasts who want to keep track of their daily workouts. The application includes a public API.

As an avid gym-goer, I wanted to build an application that would allow me to keep track of my daily workouts so I can look back during the week and decide my next day. I found myself writing down what exercises I did and what muscles I was focusing on each day in a notes app.  This inspired me to build an application that would better organize this information!

## Check it out here!
https://workitout.page

## Technologies[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#pin)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

**Work it Out also utlizes a public API, [API Ninja's Exercise API ](https://api-ninjas.com/api/exercises). The API serves random exercises for users.**

## Features[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#pin)
* Add workouts that they've done on each day.
* View workouts they've done on different days according to month.
* Edit and delete workout entries.
* Find new exercise ideas.
* Save exercise ideas to a "Bookmarks" page.
* Delete exercise ideas from "Bookmarks" page.
* View how many workouts they've recorded per month in a graph.
* View a pie chart of the distribution of muscle groups they've worked out.
* Create an account.
* Sign into an account.
* Sign out  of an account.
## Demo[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#pin)
#### How to create an account and sign in.
![ How to create an account and sign in. ](/gifs/signin.gif)
#### How to add a workout for a day and see its info (can edit and delete workouts as well).
![ How to add a workout for a day and see its info. ](/gifs/workout.gif)
#### How to find new exercise ideas and view saved ideas.
![How to find new exercise ideas and view saved ](/gifs/ideas.gif)
#### How the graph and pie chart displays workout information.
![How the graph and pie chart displays workout information. ](/gifs/tracker.gif)
## Stretch Features[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#pin)
* Separate workouts by year.
## Getting Started[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#pin)
1. Clone the repository.

    ```shell
    git clone https://github.com/leanne-vu/work-it-out.git
    ```
 **or**

1. Copy code of project at
 https://github.com/leanne-vu/work-it-out

   - client (directory)
        - components (directory)
        - lib (directory)
        - pages (directory)
        - app.jsx
        - index.jsx
    - database (directory)
        - data.sql
        - import.sh
        - schema.sql
    - server (directory)
        - public (directory)
        - authorization-middleware.js
        - client-error.js
        - error-middleware.js
        - index.js
        - static-middleware.js

2. Install all dependencies with NPM or copy package.json

    ```shell
    npm install
    ```

3. Start the project. You may open the project using live server or your chosen program to serve the files.
