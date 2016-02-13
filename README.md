# URL-Shortener-Microservice

# Example usage:
      https://APP_URL/new/https://www.google.com
     
      https://APP_URL/new/http://freecodecamp.com/news
     
      If you want to pass a site that doesn't exist (or an invalid url) for some reason you can do:
      https://APP_URL/new/invalid?allow=true
        
##Example creation output:
```js
{ "original_url": "http://freecodecamp.com/news", "short_url": "https://APP_URL/4" }
```
##Usage:
https://APP_URL/4
##Will redirect to:
http://freecodecamp.com/news