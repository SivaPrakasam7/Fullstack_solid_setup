lerna run test --stream --scope=backend
killall -9 node
lerna run cy:chrome --stream --scope=frontend -- --component
lerna run dev --stream --scope=frontend --scope=backend -- --mode test &
lerna run cy:chrome --stream --scope=frontend -- --e2e
killall -9 node