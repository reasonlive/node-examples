const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "ru"],
  },
  localePath: path.resolve("./public/locales"),
};
