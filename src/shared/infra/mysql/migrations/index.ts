const query = process.argv[2];

switch (query) {
	case "execute":
	case "run": {
		import("./execute").then(f => f.default().then(() => {
			process.exit(0);
		}));
		break;
	}
	case "create": {
		import("./create").then(f => f.default().then(() => {
			process.exit(0);
		}));
		break;
	}
	case "revert": {
		import("./revert").then(f => f.default().then(() => {
			process.exit(0);
		}));
		break;
	}
}