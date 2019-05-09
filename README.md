# hypothetical_cms
A hypothetical CMS Implementation using Django and VueJS

# References
Please have a look at all the libraries listed under package.json

Thanks these blogs for helping me out:
https://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example#auth-header-js

https://www.pydanny.com/drf-jwt-axios-vue.html

https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex

https://hackernoon.com/jwt-authentication-in-vue-js-and-django-rest-framework-part-1-c40c5c0d4f6e

https://medium.com/@samy_raps/simple-movies-web-app-with-vue-vuetify-and-django-part-3-the-api-53113837dbce

and answers on Stackoverflow

VueJS's default logo is used for demo purposes

## Frontend
Front-end consists of a VueJS 2 application that has its boilerplate from vue-cli
and depends on bootstrap for UI.

The application is secured by JWT and role mechanism though it might be improved.

To start the application please run:
npm install
npm run serve

and see that it starts on 8080

## Backend
Please install the following libraries for the backend to work:

pip install django # we need django version 2 or higher

pip install djangorestframework

pip install django-cors-headers

pip install djangorestframework-jwt

pip install rest_framework_jwt

pip install django-cors-header

pip install django-filter

### Start the server at 8081
cd backend (where manage.py is located)

run the following:
python manage.py makemigrations
python manage.py migrate

This step is important to create an admin user. Email and password will be used during login on frontend:
python manage.py createsuperuser

### Changing default sqlite db:
If you want to change it into a MySQL db please change DATABASES obj in settings.py:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'DB_NAME',
        'USER': 'DB_USER',
        'PASSWORD': 'DB_PASSWORD',
        'HOST': 'localhost',   # Or an IP Address that your DB is hosted on
        'PORT': '3306',
    }
}

Then run makemigrations and migrate commands again as in the previous step.

and run:
python manage.py runserver 8081

### TODO
Add jest tests and backend tests to improve
Make components for some duplicate tables

## Please Check Screenshots
In case of inability to run the program or fail to understand the flow,
contact me and review below screenshots please:

![Login View](screenshots/login_view.png?raw=true "Login View")

![Employer View](screenshots/employer_view.jpg?raw=true "Employer View")

![Employee View](screenshots/employee_view.png?raw=true "Employee View")

![Admin View](screenshots/admin_view.png?raw=true "Admin View")


### The Business Flow
1. Login with admin user that you have created during backend setup
2. You will see empty tables
3. Go to back to register link on initial login view by logging out
4. Register users for employee and employer (no roles specified here as if
they register themselves)
5. Login as admin again
6. You will see the users in the table
7. Edit them and assign roles (put password as well - known bug)
8. As admin you can create employers or employees as well as a user with
employer role - the system role.
9. The difference is that a user can have multiple employment as history - not implemented -
This is why the concepts are separated here
10. In Manage Employers, register employers
11. In Manage Employees, register employees
12. When registering employees you will select the employer,
this is why we need to remember registering employees first
13. Logout and login as an employer
14. Manage employees show employees for the employer - shows all for now
15. Manage tasks view, there an employer can assign a task to an employee
16. Logout and login as employee
17. In Manage Tasks view, see all tasks and change their status: eg. TODO, IN PROGRESS, DONE

I know the flow can be extended such as historical employement etc. as in a HR or CMS application

Please feel free to contact