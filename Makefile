BIN=./node_modules/.bin

create-worker:
	@mkdir -p dist
	@$(BIN)/browserify webworker.js -t [ babelify --presets [ es2015 ] ] | $(BIN)/uglifyjs > ./dist/worker.js
