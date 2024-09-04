## Inspiration

I remember being a sophomore and junior in college, and I struggled both years to get an internship. Watching my friends land fantastic jobs, I often found myself wishing for 
the same opportunities.

I took this challenge head-on, focusing on elevating my networking skills to what I considered my superpower. My strategy involved sending targeted cold emails to land an internship. Gradually, my method improved with each email I sent, demonstrating the significant power of taking the initiative.

This project stems from the belief that closed mouths aren't fed. Why wait for opportunities when you can create them? 

This is the power of asking, the essence of this project.

[<img src="assets/screenshot.jpeg">](https://www.loom.com/share/f1ba0bdca9db4d968335e99f2852e647?sid=0a3a43be-ae7d-477a-926c-2ead040aa1b3)

Click on the picture - it's a video!


## The End-to-End process

There are two parts to making this work.

First, we collect people we want to email from LinkedIn, and second, we send emails based on their names and companies.

The users first search for engineering managers hiring for their desired role on LinkedIn. They then copy all the contents of the LinkedIn search and add them to a text file. 

<img src="assets/linkedin.png">

This file, full of information, is pre-processed using SpaCy, an open-source library for advanced natural language processing. 

A natural language process (NLP) called Named Entity Recognition is used, which classifies pieces of text into pre-defined categories. It then extracts all the entities (pieces of text) labeled as people and uses additional regex to clean up any extraneous information.

Now, with a list of names, the MatLab code works on splicing together and sending emails with the full name and company name like so: {firstname}.{lastname}@{companyname}.com

<img src="assets/template.png">

It’s configured with MATLAB's preferences to use Gmail's Simple Mail Transfer Protocol (SMTP) server for email sending, including setting up SSL for secure communication. 

It then generates personalized emails for each contact by replacing placeholders in a template with the recipient's information. This is automated through a MATLAB script that reads names from a file, constructs each email, and finally sends it using the configured SMTP settings.

After sending the emails, the script generates an output file containing all personalized emails, providing a record of the outreach effort and enabling us to track our networking activities effectively.

<img src="assets/mail.png">


## Challenges we ran into

One of the most significant challenges I faced was implementing the email-sending functionality in Matlab. Gmail has strict authentication requirements, especially for applications attempting to access an account via SMTP. 

Authentication was failing multiple times for various reasons, and this entailed creating app passwords and enabling multi-factor authentication.

<img src="[assets/fix.png](https://github.com/abhitej-bokka/ask-by-abhi/blob/main/assets/fix.png)">


## Accomplishments that we're proud of

This was my first time using Matlab outside of math classes, and I’m proud to have used it unconventionally. As much as I struggled with understanding how SMTP works, reading online documentation and forums helped me understand my problems. This ability to innovate and overcome came through; I’m glad it worked out.

## What we learned

I learned how to use NLP effectively and gained a deeper understanding of SMTP. Being able to code in Python and Matlab gave me the flexibility to take a step back and see how the two automations meshed together and where each language’s capabilities shined.

## What's next for Ask by Abhi

Eventually, I can scale this service to automate emails without going to LinkedIn, and it can run as a background service, given simply the job link. It will be game-changing to the internship grind and ensure students can land their dream internship.





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
