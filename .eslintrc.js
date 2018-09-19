module.exports = {
  parser: "babel-eslint",
  extends: "booheefe",
  // add your custom rules here
  "rules": {
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    getApp: true,
    Component: true,
    getCurrentPages: true,
    __wxConfig: true
  }
};
