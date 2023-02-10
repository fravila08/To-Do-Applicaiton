# Run Locally

1. Clone the project

```bash
  git clone https://github.com/fravila08/To-Do-Applicaiton.git
```

2. Open a second terminal on the same directory

3. Checkout current branch on both terminals

```bash
  git checkout TODO-003
```

## Start Django Server(Terminal-1)

4. Create and activate Python Virtual Environment

```bash
#CREATE
python -m venv <env>

#ACTIVATE
source <env>/bin/activate
```

5. Go to the project directory and install dependencies

```bash
  cd to_do_server
  pip3 install -r requirements.txt
```

6. Create .env file with `SECRET_KEY` from to_do_server/settings.py

```bash
  #Opens vim and creates your .env file in current directory
  vim .env

  #Press 'i' on your keyboard and type in the following
  django = <SECRET_KEY>

  #Now exit --INSERT-- mode by pressing the 'ESC' key on your keyboard
  #then exit and save the file by entering the following
  :wq
```

7. Create PostgreSQL database

```bash
  #Creates DB
  createdb to_do_pro
```

8. Migrate models into Database

```bash
  python manage.py migrate
```

9. Load data into Database

```bash
  python manage.py loaddata data.json
```

10. Start the server

```bash
  python manage.py runserver
```

## Run React Project(Terminal-2)

4. Change directory into project

```bash
  cd to_do_client
```

5. Install dependencies

```bash
  npm install
```

6. Build the project

```bash
  npm run build
```

## On Browser

Go to [localhost:8000](http://127.0.0.1:8000/)

### Resources

- [Launching Django](https://code.visualstudio.com/docs/python/tutorial-django)
- [Building React App](https://vitejs.dev/guide/)
