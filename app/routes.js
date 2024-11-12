export default function(app) {
    // Aquí defines las rutas de tu aplicación.
    app.get('/', (req, res) => {
      res.send('Hello World');
    });
    // Más rutas...
  }