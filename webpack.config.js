const HtmlWebpackPluguins = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  output: {
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/,
        //Tenemos que excluir la siguiente regla sino solo se aplica esta y se detiene
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader",
      },
    ],
  },
  optimization: {},
  plugins: [
    new HtmlWebpackPluguins({
      title: "My First Webpack App",
      // filename: "hellocat.html",
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      // [fullhash].css: Nos va a ser útil para que los navegadores de los clientes no mantenga ese archivo en caché
      filename: "[name].css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
        },
      ],
    }),
  ],
};
