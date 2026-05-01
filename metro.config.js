const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.server = {
  enhanceMiddleware: (middleware) => {
    return async (req, res, next) => {
      try {
        if (req.url && req.url.startsWith('/api/v1/auth/login')) {
          const apiKey = process.env.EXPO_PUBLIC_RUTA_SEGURA_API_KEY;
          if (!apiKey) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ message: 'Falta EXPO_PUBLIC_RUTA_SEGURA_API_KEY en el servidor local.' }));
            return;
          }

          const chunks = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', async () => {
            const body = Buffer.concat(chunks).toString('utf8');
            const upstream = await fetch('https://ruta-segura-administrador.vercel.app/api/v1/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': req.headers['content-type'] || 'application/json',
                apiKey,
              },
              body,
            });

            const text = await upstream.text();
            res.statusCode = upstream.status;
            res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
            res.end(text);
          });
          return;
        }
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ message: error instanceof Error ? error.message : 'Error en proxy de login.' }));
        return;
      }

      return middleware(req, res, next);
    };
  },
};

module.exports = config;
