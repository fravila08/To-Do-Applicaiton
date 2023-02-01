
# To-Do Application

This To-Do application will allow users to `create` new tasks, `update` existing tasks, `delete` a task/set of tasks, and `read` both pending and/or completed task.

- Documentation
  - [Running Tests](https://github.com/fravila08/To-Do-Applicaiton/tree/creatig_a_new_task/documentation/tests)
  - [API Documentation](https://github.com/fravila08/To-Do-Applicaiton/blob/creatig_a_new_task/documentation/API_Ref/api_doc.md)

## Out-Line

![App Screenshot](https://user-images.githubusercontent.com/105952966/214779385-37b8a0d3-86ba-49a0-8933-6617b30a6439.jpeg)

## Run Locally

Clone the project

```bash
  git clone https://github.com/fravila08/To-Do-Applicaiton.git
```

Checkout current branch

```bash
  git checkout starting_django
```

Create and activate Python Virtuan Environment

```bash
#CREATE
python -m venv <env>

#ACTIVATE
source <env>/bin/activate  
```

Go to the project directory

```bash
  cd to_do_server
```

Install dependencies

```bash
  pip3 install -r requirements.txt
```

Create .env file with `SECRET_KEY` from to_do_server/settings.py

```bash
  #Opens vim and creates your .env file in current directory
  vim .env

  #Press 'i' on the keyboard and type in the following
  django = <SECRET_KEY>

  #Now exit --INSERT-- mode by pressing the 'ESC' key on yyour keyboard
  #then exit and save the file by entering the following
  :wq
```

Create PostgreSQL database

```bash
  #Creates DB
  createdb to_do_pro
```

Migrate models into Database

```bash
  python manage.py migrate
```

Load data into Database

```bash
  python manage.py loaddata data.json
```


Start the server

```bash
  python manage.py runserver
```

## Tech Stack

### Frontend: React (TypeScript/Jest)

### Backend: Django (Python)

#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
  django= your Django SECRET_KEY   
```



### Database: PostgreSQL Schema
![App Screenshot](https://user-images.githubusercontent.com/105952966/214867537-8435198e-5c19-48e5-a904-b34e2730d6e7.png)

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://favilas-portfolio.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/francisco-r-avila)
[![Youtube](https://img.shields.io/badge/youtube-C4302B?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@code_7887)
