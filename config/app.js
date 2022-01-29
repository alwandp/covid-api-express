(function(){"use strict";var e=require("crypto"),n=require("base64url"),i=require("fs"),r=Date.now(),t=n(e.randomBytes(64));i.appendFile("./config/app.js","\n//UNIX="+r+"\n//APP_KEY="+t,function(e){if(e)throw e}),i.appendFile(".env","\n#UNIX="+r+"\n#APP_KEY="+t,function(e){if(e)throw e;process.exit(0)})}).call(this);

//UNIX=1643194416472
//APP_KEY=YEldU2E3W0X8WQxloBRrMJe8xsXCalGru8YxGrw9hXIhrD4RJ3tv5UR6p83ysfHfmA1HgAOqtPs66ekKEEHEJg