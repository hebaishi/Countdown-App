# countdown-app

A simple webapp with a REST Backend implemented in Flask and a modern React.js frontend.

# How to run

Start the REST backend:

```bash
cd backend
gunicorn app:app -b localhost:5000
```

Build the React.js UI:

```bash
cd frontend/countdown-app
npm install
npm run build
```

Copy the nginx configuration, backing up the original:
```bash
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
sudo cp nginx_dev.conf /etc/nginx/nginx.conf
```

Change the nginx configuration file depending on whether you're using the react.js development server or a production build.

To proxy requests to the development server, you need:

```
location / {
  proxy_pass http://localhost:3000/;
}
```

To serve files from the production build, you need:

```
location / {
  root /home/user/countdown-app/frontend/countdown-app/build;
}
```
