# Le Chat

## About
A simple chat application that features a Flask back-end,
React front-end, and Socket.io.

## Easy Start:
1. Verify that you have NPM, Python3, and Pip installed.
2. Execute the `run.sh` script:
```bash
$ ./run.sh # from the root of the project
```
This will install all dependencies and startup the Flask server. 
Visit `http://localhost:5000` in your browser to view the application.


## Development
### Setup

**1. Install client-side dependencies:**
```bash
$ cd client # from the root of the project
$ npm install
```

**2. Install server-side dependencies:**
```bash
$ cd server # from the root of the project
$ pip install --editable .
```

### Making Changes

**1. Start the React development server:**
```bash
$ cd client
$ yarn start
```
This will startup a local development server at `http://localhost:3000`.
Visit `http://localhost:3000` in your browser to view the front-end.
It will automatically reload as you make changes.

**2. Start the Flask server:** _(In another terminal window/tab:)_
```bash
$ cd server
$ export FLASK_DEBUG=True
$ export FLASK_APP=server
$ flask run
```

## Attributions

"Happy Cat" icon by Erika Jasso, from her [_Cat Collection_](https://thenounproject.com/kikajasso/collection/cat/)
@ the Noun Project
