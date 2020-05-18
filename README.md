This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 装饰器配置

1、
```shell
npm i  @babel/plugin-proposal-decorators customize-cra react-app-rewired
```
2、
```js
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
```
3、新建config.overrides.js
```js
const { override, addDecoratorsLegacy } = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy()
)
```