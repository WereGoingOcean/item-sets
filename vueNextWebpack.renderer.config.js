const { VueLoaderPlugin } = require("vue-loader");

module.exports = function (config) {
  config.module.rules.push({
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
      loaders: {
        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
        // the "scss" and "sass" values for the lang attribute to the right configs here.
        // other preprocessors should work out of the box, no loader config like this necessary.
        scss: ["vue-style-loader", "css-loader", "sass-loader"],
        sass: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"],
      },
      // other vue-loader options go here
    },
  });

  config.module.rules
    .filter((r) => r.loader == "ts-loader")
    .forEach((r) => (r.options.appendTsSuffixTo = [/\.vue$/]));

  config.plugins.push(new VueLoaderPlugin());

  delete config.resolve.alias.vue$;
  delete config.resolve.alias['vue-router$'];

  console.log(config);

  return config;
};
