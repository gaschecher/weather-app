# Weather Wizard App

## About the App

Welcome to the Weather Wizard! This serverless frontend/backend web application provides weather forecasts for up to 5 days for any major city. With a touch of magical flair, I wanted to create a cute and an engaging way to check the weather. The functionality is pretty limited due to time constraints, but I wanted to show off a bit of all of my skills, from Dev to Devops.

I've got full frontend/backend testing via Jest, an Auto-documenting API via swagger, a full CI/CD pipeline that automatically deploys the dockerized backend via Github actions and the frontend via Amplify, both, on any new merge to main.

## This App is Live! 👉 <a href="https://weatherapp.gabriellacodes.com" style="font-size: 24px; color: #ff6347;">CLICK HERE TO LAUNCH IT</a> 👈

Clicking the link takes you to the live version of this application at https://weatherapp.gabriellacodes.com (this is hosted via AWS Amplify for a serverless frontend experience!)

**PS: There's search autocompletion built in for cities across the globe!**

![image](https://github.com/gaschecher/weather-app/assets/114196510/97c971ae-1027-4638-bec3-501e00ed9451)


## Check out Swagger 👉 <a href="https://weatherapi.gabriellacodes.com/swagger" style="font-size: 24px; color: #ff6347;">BY CLICKING HERE</a> 👈

Similarly, for the backend, I integrated Swagger for live-updating documentation with full typing via nest's DTO's!

 Click the link above to visit https://weatherapi.gabriellacodes.com/swagger and see for yourself. (The backend is also serverless via AWS ECS Fargate with auto deployments from a github actions pipeline you can view in this repo!)

![image](https://github.com/gaschecher/weather-app/assets/114196510/a69b32d5-d9fd-4b8e-9ce7-279923b482df)
![image](https://github.com/gaschecher/weather-app/assets/114196510/2e427267-3094-4be3-a7cf-d7c0241c1ff9)



## Tech Stack

The magical tech brew includes:
- Frontend: React.js, ES6+ JavaScript, Typescript
- Backend: Node.js, Nest.js
- Testing: Jest, Swagger

- Deployment & Cloud: AWS Amplify (backed by Cloudfront for caching and CDN features), Github Actions (for dockerizing the backend and deploying it), Cloudflare for DNS and basic WAF-antibotting, AWS Fargate, ECS, and of course, Docker.

## How It Works

1. Enter your desired location (or let it autocomplete based on what you type!)
2. Watch as the Weather Wizard conjures up the forecast
3. View detailed weather information for up to 5 days


## Deployment: Cloud Architecture

To keep the theme of weather going, here's the cloud architecture diagram!
This shows what services I used to deploy the app live.

![image](https://github.com/gaschecher/weather-app/assets/114196510/0e51f1eb-c4de-498e-bda6-801fb7b7eb29)

