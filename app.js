/*

GEREKLİ PAKETLER YÜKLENİYOR...

*/
import http from 'http'; // Usa import aquí si estás en un módulo ES6
import express from 'express';
import { collectDefaultMetrics, register } from 'prom-client';
import path from 'path';
import { fileURLToPath } from 'url';

// Configura __dirname para ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ahora puedes usar __dirname como lo harías en CommonJS


collectDefaultMetrics();

const app = express();

app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(4001, '0.0.0.0');

app.set('port', process.env.PORT || 3005); // GİRİŞ PORTU AYARLANDI
app.set('views', __dirname + '/app/server/views'); // VIEW KLASÖRÜ TANITILDI
app.set('view engine', 'ejs'); // VIEW ENGINE AYARLANDI
app.use(express.static(__dirname + '/app/public')); // KULLANICILAR TARAFINDAN ERİŞİLEBİLEN KLASÖR TANIMLANDI

// Asegúrate de que el archivo app/routes existe y exporta una función
import routes from './app/routes.js';
routes(app); // ROUTE DOSYASI ÇAĞIRILDI

/*

HTTP SERVER OLUŞTURULDU

*/
http.createServer(app).listen(app.get('port'), function () {
  console.log('Sistem ' + app.get('port') + ' Portu Üzerinde Çalışıyor.');
});
