define("main", ["require", "exports", "axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    axios_1.default.get('http://google.com').then(response => {
        console.log(response);
    });
});
