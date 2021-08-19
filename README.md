# pin-my-hike

A Makers week 11 & 12 group project. 

## Description

> Don't follow the crowd. Follow the pin!

A website with a collection of hiking experiences viewable as a pin on a map shared by others. 
Click on a pin to highlight the route and view pictures of the hike.

## Repository

[PinMyHike](https://github.com/frank-mck/pin-my-hike)

## Team Members

* [Chuka Okoye-Ahaneku](https://github.com/coo990)
* [Mikey Roberts](https://github.com/mikey-roberts)
* [Fabio Rodriguez](https://github.com/frodri13)
* [Frank McKenna](https://github.com/frank-mck)
* [Cynthia Fu](https://github.com/YinnyF)
* [Ashley Slaney](https://github.com/Ashley-Slaney)

## Team Approach
* Miro Board - day 1 planning and communicating our goals
* Trello
* Agile
* [XP Values](http://www.extremeprogramming.org/values.html)
* Communication
* Daily self-lead learning in the morning, pairing in the afternoon
* Daily stand ups & retros
* Feedback - Code Reviews, demos
* Semantic commit messages

## Technology Used
* MERN Stack (MongoDB, Express, React, Node)
* DB Hosting: MongoDB Atlas
* Testing: Jest
* API Testing: Insomnia, Postman
* API: Google API
* Linting: ESLint
* CI: CircleCI

## Preview
![Imgur](https://i.imgur.com/DGriDOG.png)

## Usage

### Set up env varibles
1. Register for a Google Maps API Key.
    APIs that need to be enabled:
    * Geocoding API
    * Geolocation API
    * Maps JavaScript API
    * Places API

2. Retrieve your MongoDB URI:
    * Go to MongoDB Atlas > connect > connect your application
    * Copy the URI
    * Edit the URI so that `<password>` is replaced by your real MongoDB password
    * Edit the URI so that `myFirstDatabase` is replaced by `pin_my_hike`
3. Retrieve your font awesome CDN.

Create a .env file at the root and insert the following:
```
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
PIN_MY_HIKES_DB_URI=YOUR_MONGODB_ATLAS_URI
FONT_AWESOME_CDN=YOUR_FONT_AWESOME_CDN
```

### Set up
```
npm install
cd client
npm install
```

### Testing
```
cd client
npm run test
```

### Linting

To run either in root or client:-
In root:
```
npm run lint
```

In client:
```
cd client
npm run lint
```

## User Stories

```
As a user,
So that I can go hiking,
I want to see my pinned trails.
```
```
As a user,
So that I can get some insight on the hiking trail,
I want to be able to enter a description for my hike.
```
```
As a user,
So I can share my experience visually,
I want to upload a photo of my hike.
```
```
As a user,
So that I can view PinMyHike on the go,
I want to be able to see a nice mobile view.
```
```
As a user,
So that I am more likely to return to the site,
I want to be able to navigate a well designed UI.
```
```
As a user,
So that I can go hiking,
I want to see my favourite trails.
```
```
As a user,
So I can gauge where I am going,
I want to see my location.
```
```
As a user,
So I can pick a new hiking trail,
I want to view the most popular locations near me.
```
```
As a user, 
So I can get an idea of how good a route is, 
I want to be able to see ratings of pinned routes.
```

## Model Diagram

<img src="/readme_images/model.png" alt="model diagram"/>

## Miro Board

<img src="/readme_images/miro.png" alt="team miro board"/>
