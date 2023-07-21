//archivo que arranca el servidor
import express from "express";
const app = express();
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/taks.routes.js";
//(para ver la peticiones que van llegando) morgan is a logging framework for node.js. It is used to log HTTP requests.

//cors permite la comunicacion entre el front y back
app.use(cors());

// Middleware que utiliza Morgan para registrar las solicitudes HTTP en la consola en el formato 'dev'.
app.use(morgan("dev"));

// Middleware que permite que Express analice el cuerpo de las solicitudes con formato JSON.
app.use(express.json());

// Middleware que permite que Express analice el cuerpo de las solicitudes codificadas en URL.
// La opción 'extended: true' permite analizar objetos complejos en el cuerpo de la solicitud.
app.use(express.urlencoded({ extended: true }));

// Middleware que agrega las rutas definidas en el enrutador de tareas (taskRoutes) al servidor de Express.
// Esto permite que el servidor maneje las solicitudes relacionadas con las tareas definidas en taskRoutes.
app.use(taskRoutes);

//the (err, req, res, next) is use for error handling
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("Server on port 3000");
});
