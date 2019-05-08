# hypothetical_cms
A hypothetical CMS Implementation using Django and VueJS

# References
Please have a look at all the libraries listed under package.json

Thanks these blogs for helping me out:
https://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example#auth-header-js

https://www.pydanny.com/drf-jwt-axios-vue.html

https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex

https://hackernoon.com/jwt-authentication-in-vue-js-and-django-rest-framework-part-1-c40c5c0d4f6e

## Frontend
Front-end consists of a VueJS 2 application that has its boilerplate from vue-cli
and depends on bootstrap for UI.

## Backend
Please install the following libraries for the backend to work:

pip install django # we need django version 2 or higher

pip install djangorestframework

pip install django-cors-headers

pip install djangorestframework-jwt

pip install rest_framework_jwt

pip install django-cors-header

### Start the server at 8081
cd backend (where manage.py is located)
and run:
python manage.py runserver 8081