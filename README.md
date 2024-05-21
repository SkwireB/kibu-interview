# Kibu Technical Project

## Overview

This is a simple notes taking and member recording application for the Kibu Technical Interview.

## Libraries Used
NextJs - setup and server components
Axios - for interacting with the server using api calls
React Query - for managing server state by fetching and caching data

## Design

I designed my application to be customer accessible, and be easy to read. Each members notes is seperated by a dropdown, and the add button will only add to the current user.
This simplifies the process by sorting each customers notes onto their own page and makes adding notes for individual users less confusing.
For the backend, I've chosen to keep track of everything within a state on a main page, such that the page will control which user is showing, and if a note can be added.
I've elected to seperate the api calls onto a seperate page, and have the frontend import from the api page for its methods.
I utilized Axios and React Query when building the backend to easily interact with the json database.

## Run and Test
To run:

Install the json server

```
npm install -g json-server
```

Install any other dependencies

```
npm i
```

Start the json server

```
npm install -g json-server
```
This will host the json server on http://localhost:3000/.
Open a new terminal, and run the application in the dev environment

```
npm install dev
```

Then open a browser and navigate to http://localhost:3001/, since 3000 is already hosting the json.

