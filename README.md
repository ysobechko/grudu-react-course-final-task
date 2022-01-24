# Final task for React course

This repo contains final project requirements and template for [GridU React course](https://gridu.litmos.com/home/LearningPath/26572?r=False&ts=637785982384795974).

## Requirements
We're building "Antoher Twitter Clone" app that resembles basic functionality of, you guessed it, Twitter. App contains the total of 3 pages (see [mockups](#mockups) for visual guidelines):

1) Login - allows user to enter email and password (both required), validates them on UI (see [validation rules](#validation)), sends request to login endpoint (see [mock server docs](#mock_server)) on form submition and redirects to tweets page if the response code is 200. Shows "Invalid email or password" message if the response code is 404. Shows "Something went wrong" message for other error codes.

2) Signup - allows user to enter email, password and full name (all required), validates them on UI (see [validation rules](#validation)), sends request to signup endpoint (see [mock server docs](#mock_server)) on form submition and redirects to tweets page if the response code is 200. Shows "Something went wrong" message for error response codes.

3) Tweets - fetches tweets (see [mock server docs](#mock_server)) and displays them in a list. Also allows user to create a tweet by typing it into the text input (see [validation rules](#validation)) and clicking "Tweet", after that app should consequently 1) send request to create tweet endpoint (see [mock server docs](#mock_server)) and 2) refectch tweets list.

## Mockups
See [PDF](twitter-clone.pdf) and [Figma](twitter-clone.fig) files in this repo. Please note that these mockups are just visual guidelines, not final designs. You're encouraged to apply creativity, use color pallete and UI elements of your choice (components library usage recommended to save time, but not required).

### Validation
If the input is touched and invalid it should be highlighted red and display "Invalid ..." message.

Email - [pretty complex syntax](https://en.wikipedia.org/wiki/Email_address#Syntax), recommend to use [validation library](https://github.com/manishsaraan/email-validator)

Password - minimum length 8 symbols, maximum length 256 symbols.

Full name - minimum 1 symbol, maximum 512 symbols.

Tweet - minimum 1 symbol, maximum 140 symbols (we're cloning old-school Twitter here).

## Project template

## Mock server

## Help
