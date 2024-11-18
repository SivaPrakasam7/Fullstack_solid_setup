#!/bin/bash

npx lerna run test --stream --scope=backend
killall -9 node
npx lerna run cy:run --stream --scope=frontend -- --component --browser chrome
npx lerna run dev --stream --scope=frontend --scope=backend -- --mode test &
npx lerna run cy:run --stream --scope=frontend -- --e2e --browser chrome
killall -9 node