# BackEnd Tests With Django

## Pre-Requisites

- Clone the repository
- Create your `.env file` holding your SECRET_KEY
- Change directory into `to_do_server`

## Running Tests

- Running All Tests

```bash
  python3 manage.py test to_do_app/tests
```

- Running Models Tests

```bash
  python3 manage.py test to_do_app.tests.test_models
```

- Running Urls Tests

```bash
  python3 manage.py test to_do_app.tests.test_urls
```

- Running Views Tests

```bash
  python3 manage.py test to_do_app.tests.test_views
```

## Resources

- [Django Testing](https://docs.djangoproject.com/en/4.1/topics/testing/)
- [CORS](https://www.stackhawk.com/blog/django-cors-guide/)
