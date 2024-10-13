lerna run test --stream --scope=backend
killall -9 node
lerna run dev --stream --scope=frontend --scope=backend -- --mode test &
lerna run cy:chrome --stream --scope=frontend
killall -9 node