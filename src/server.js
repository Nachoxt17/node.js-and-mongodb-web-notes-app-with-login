const express = require("express");
const exphbs = require("express-handlebars"); /**+-Motor de Plantillas Express-Handlebars https://www.npmjs.com/package/express-handlebars .*/
const path = require("path"); /**( https://www.npmjs.com/package/path ).*/
const morgan = require("morgan");
const methodOverride = require("method-override"); /**( https://www.npmjs.com/package/method-override ).*/
const flash = require("connect-flash"); /**( https://www.npmjs.com/package/connect-flash ).*/
const session = require("express-session"); /**( https://www.npmjs.com/package/express-session ).*/
const passport = require("passport");

// Iniatilizations:_
const app = express();
require("./config/passport.js");

// Settings:_
app.set(
  "port",
  process.env.PORT || 4000
); /**+-En muchos entornos (por ejemplo, Heroku), se puede configurar la variable de entorno PORT para que le diga a su Servidor Web qué puerto debe--|.*/
/**|-->escuchar. Entonces, process.env.PORT || 3000 significa: lo que sea que esté en la variable de entorno PORT, o 3000 si no hay nada allí.*/

app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Middlewares:_
app.use(morgan("dev"));
app.use(
  express.urlencoded({ extended: false })
); /**+-Para que cada Vez que lleguen Datos de Un Formulario en nuestra Web, se conviertan esos Datos al Formato JSON.*/
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "ilovepizza&lasagna",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables:_
app.use((req, res, next) => {
  /**+-"next" sirve para que continue con el Código que está debajo.*/
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes:_

// app.get('/', (req, res) => {
//     res.render('index.hbs');
// });
app.use(require("./routes/notes.routes"));
app.use(require("./routes/users.routes"));

// Static Files:_
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
