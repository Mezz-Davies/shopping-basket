# Specification

Write an application and associated unit tests that can price a basket of goods in several currencies.

The goods that can be purchased, which are all priced in GBP, are:

• Peas – 95p per bag
• Eggs – £2.10 per dozen
• Milk – £1.30 per bottle
• Beans – 73p per can

The program should allow the user to add or remove items in a basket. The user can click on a checkout
button which will then display the total price for the basket with the option to display the amount in different
currencies. For example, if the basket contained Milk and the currency selected was USD with an exchange
rate of 1.5, the total would be $1.95 USD.

The list of currencies should be consumed from https://api.exchangeratesapi.io/latest?base=GBP. The
exchange rates may change at any time.

No UI design constraints are enforced – you should feel free to design the UI in the way you believe is most
appropriate. Your design and code should meet these requirements and be sufficiently flexible to allow for
future extensibility. Code should be well structured, suitably commented, have error handling and be tested.

# About this project
This project is coded in React. To run this project, you must first run `npm install` to install the node dependencies. The complete project is available [here](https://github.com/MezzOMG/shopping-basket).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.