 #!/bin/sh

if [ "${NODE_ENV}" = "prod" ]; then
	echo "Running Production";
	npm run start:production;
fi

if [ "${NODE_ENV}" = "staging" ]; then
	echo "Running Staging";
	npm run start:staging;
fi
