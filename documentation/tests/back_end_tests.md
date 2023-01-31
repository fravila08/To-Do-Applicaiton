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
  python3 manage.py test to_do_app/tests/test_models.py
```

- Running Urls Tests
```bash
  python3 manage.py test to_do_app/tests/test_urls.py
```

- Running Views Tests
```bash
  python3 manage.py test to_do_app/tests/test_views.py
```