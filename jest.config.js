// jest.config.js

module.exports = {
	verbose: true,
	moduleDirectories: ["node_modules", "src"],    
	setupTestFrameworkScriptFile: '<rootDir>/jest-setup.ts',
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
	},
	transform: {
		"^.+\\.(jsx?|tsx?)?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node"
	],
	testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    globals: {
		"ts-jest": {
			"useBabelrc": true
		}
    }
};