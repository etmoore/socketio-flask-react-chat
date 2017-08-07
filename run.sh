#!/bin/bash

cd client
npm install
npm build

cd ../server
pip install --editable .
export FLASK_APP=server
flask run
