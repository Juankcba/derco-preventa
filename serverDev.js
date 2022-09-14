const cliDev = require("next/dist/cli/next-dev");
cliDev.nextDev(["-p", process.env.PORT || 3333]);
