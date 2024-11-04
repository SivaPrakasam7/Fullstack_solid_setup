npx lerna run test --stream --scope=backend
killall -9 node
npx lerna run cy:chrome --stream --scope=frontend -- --component
npx lerna run dev --stream --scope=frontend --scope=backend -- --mode test &
npx lerna run cy:chrome --stream --scope=frontend -- --e2e
killall -9 node