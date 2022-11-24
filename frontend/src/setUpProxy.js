const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app ) => {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://localhost:8080', 
			changeOrigin: true,
		})
   );
   app.use(
		createProxyMiddleware('/api/OAuth/google', {
			target: 'https://accounts.google.com', 
			changeOrigin: true,
		})
   );
	app.use(
		createProxyMiddleware('/openvidu', {
			target: 'https://i7a809.p.ssafy.io:8443',
			changeOrigin: true,
		})
	  )
};