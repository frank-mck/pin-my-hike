# pin-my-hike

A Makers week 11 & 12 group project. 

## Description

> INSERT ONE-LINER HERE

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
```
INSERT ALL THE GOOD STUFF ABOUT AGILE HERE
```

## Technology Used
* MERN Stack (MongoDB, Express, React, Node)
* Testing: Jest
* API Testing: Insomnia
* API: Google API
* Linting: ESLint
* CI: CircleCI
* Heroku

## APIs that need to be enabled:
- Geocoding API
- Maps JavaScript API
- Places API

## Examples

```
INSERT SCREENSHOTS/GIFS HERE
[HOMEPAGE]
[SIGN UP/IN]
[CLICKING A PIN]
[CREATING A PIN]
```

## Usage

### Set up env varibles
1. Register for a Google Maps API Key.
2. Retrieve your MongoDB URI:
    * Go to MongoDB Atlas > connect > connect your application
    * Copy the URI
    * Edit the URI so that `<password>` is replaced by your real MongoDB password
    * Edit the URI so that `myFirstDatabase` is replaced by `pin_my_hike`

Create a .env file at the root and insert the following:
```
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
PIN_MY_HIKES_DB_URI=YOUR_MONGODB_ATLAS_URI
FONT_AWESOME_CDN=YOUR_FONT_AWESOME_CDN
```

### Testing
```
INSERT HOW TO TEST HERE
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
