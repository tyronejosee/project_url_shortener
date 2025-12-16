<div align="center">
  <a href="https://github.com/tyronejosee/project_url_shortener" target="_blank">
    <img src="./.github/logo.svg" width="80">
  </a>
</div>
<div align="center">
  <h1><strong>URL Shortener</strong></h1>
</div>
<p align="center">
API built with Django and Django REST Framework, it provides endpoints for creating, managing, and retrieving shortened URLs, also offers features for tracking clicks, groups, and plans, it integrates with various notification services and email services. The frontend is built with Next.js and Tailwind CSS, Auth.js, and HeroUI, it provides a responsive and user-friendly interface for users to interact with the API.
<p>

<p align="center">
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-5.7.3-007ACC" alt="typescript-version">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/nextjs-15.2.4-000000" alt="nextjs-version">
  </a>
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/python-3.13.1-3572A5" alt="python-version">
  </a>
  <a href="https://www.djangoproject.com/">
    <img src="https://img.shields.io/badge/django-5.1.6-092E20" alt="django-version">
  </a>
  <a href="https://www.django-rest-framework.org/">
    <img src="https://img.shields.io/badge/drf-3.15.2-A30000" alt="drf-version">
  </a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/docker-26.0.0-0db7ed" alt="docker-version">
  </a>
    <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/postgresql-16.4-336791" alt="postgresql-version">
  </a>
</p>

## 💻 General

### 🗃️ Repository

Clone the repository.

```bash
git@github.com:tyronejosee/project_url_shortener.git
```

### 🌱 Contribute

If you would like to contribute to the project:

1. Fork the repository.
2. Create a branch with the name of your feature: `git checkout -b feature/new-feature`.
3. Make your changes and commit: `git commit -m 'feat: added new feature'`.
4. Push your changes: `git push origin feature/new-feature`.
5. Open a Pull Request and submit your changes to the `develop` branch.

### ⚖️ License

This project is under the [Apache License](https://github.com/tyronejosee/project_url_shortener/blob/main/LICENSE) Licence.

## 🛠️ Backend

### ⚙️ Installation

Create a virtual environment (Optional, only if you have Python installed).

```bash
python -m venv env
```

Activate the virtual environment (Optional, only if you have Python installed).

```bash
env\Scripts\activate
```

> Notes: `(env)` will appear in your terminal input.

Install all dependencies (Optional, only if you have Python installed).

```bash
pip install -r requirements/local.txt
```

Create a copy of the `.env.example` file and rename it to `.env`.

```bash
cp .env.example .env
```

**Update the values of the environment variables (Important).**

> Note: Make sure to correctly configure your variables before building the container.

### 🐳 Docker

Build your container; it will take time the first time, as Docker needs to download all dependencies and build the image.
Use the `-d` (detached mode) flag to start your containers in the background.
Use the `--build` flag if you have changes and need to rebuild.

```bash
docker compose up
docker compose up -d
docker compose up --build
```

Stop the running containers (does not remove them).

```bash
docker compose stop
```

Start previously created and stopped containers.

```bash
docker compose start
```

Show container logs in real-time.

```bash
docker compose logs -f
```

Restart a service with issues (Replace `<service_name>`).

```bash
docker compose restart <service_name>
```

Remove your container.

```bash
docker compose down
```

### 🐍 Django

Access the `web` service console that runs Django.

```bash
docker compose exec web bash
```

Inside the Django console, create the migrations.

```bash
python manage.py makemigrations
```

Run the migrations.

```bash
python manage.py migrate
```

If you need to be more specific, use:

```bash
python manage.py migrate <app_label> <migration_name>
```

List all available migrations and their status.

```bash
python manage.py showmigrations
```

> Note: Manually create the migration if Django skips an app; this happens because Django did not find the `/migrations` folder.

Create a superuser to access the entire site without restrictions.

```bash
python manage.py createsuperuser
```

Log in to `dashboard`:

```bash
http://127.0.0.1:8400/dashboard/
```

Access Swagger or Redoc.

```bash
http://127.0.0.1:8400/api/schema/swagger/
http://127.0.0.1:8400/api/schema/redoc/
```

### 🚨 Important Notes

Check the creation of migrations before creating them.

```bash
docker compose exec web python manage.py makemigrations users
```

> Note: Checking migrations before their creation is necessary to avoid inconsistencies in user models.

### 🐘 PostgreSQL

Access the PostgreSQL console.

```bash
docker compose exec db psql -U <database_user> -d <database_name>
```

> Note: `-U` User, `-d` Database

List all the tables in the database.

```bash
\dt
```

Show the detailed structure of a specific table.

```bash
\d <table_name>
```

Create a backup of your database (Optional).

```bash
docker compose exec web python manage.py dumpdata > backup.json
```

Load the created backup if needed (Optional).

```bash
docker compose exec web python manage.py loaddata
```

## 🎨 Frontend

The front-end of the application was created with [Next.js](https://nextjs.org/) using the App Router introduced in Next.js 15 and the package manager [NPM](https://www.npmjs.com/).

### ✅ Requirements

- [Node.js](https://nodejs.org/) >= 22.11.0
- [PNPM](https://pnpm.io/) >= 10.14.0

### ⚙️ Installation (Front-end)

Navigate to the `frontend` folder:

```bash
cd ./frontend/
```

Install the dependencies:

```bash
pnpm install
```

### Available Scripts

Start the development server at `http://localhost:3000/`

```bash
pnpm run dev
```

Build the application for production.

```bash
pnpm run build
```

Start the server in production mode.

```bash
pnpm run start
```

Run the linter to check the code quality.

```bash
pnpm run lint
```

### 📂 App Router Setup

This project uses the **App Router** from Next.js to handle routing. Page files (`page.tsx`) are placed inside folders within the `app/` directory. Example:

```bash
app/
├── page.tsx         # Main page at "/"
├── urls/
│   └── page.tsx     # URLs page at "/urls"
```

You can create new routes simply by adding folders inside `app/` and adding `page.tsx` files for the views.

You can deploy this application on platforms like [Vercel](https://vercel.com/) (the recommended one for Next.js), [Netlify](https://www.netlify.com/), or any other service that supports Node.js.

## 📦 Resources

Some resources used in this project:

- [Django](https://www.djangoproject.com/) - Web framework in Python.
- [Django REST Framework](https://www.django-rest-framework.org/) - REST APIs in Django.
- [Django SES](https://django-ses.readthedocs.io/en/latest/) - Email backend in Python.
- [Django Storages](https://django-storages.readthedocs.io/en/latest/) - Static and media files in Python.
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - API documentation in HTML.
- [Redoc](https://redoc.ly/) - API documentation in HTML.
- [Ruff](https://docs.astral.sh/) - Linter in Python.
- [Pre-commit](https://pre-commit.com/) - Git hooks in Python.
- [Next.js Documentation](https://nextjs.org/docs) - Frontend framework in JavaScript.
- [PNPM](https://pnpm.io/) - Package manager in JavaScript.
- [Prettier](https://prettier.io/) - Code formatter in JavaScript.
- [Auth.js](https://authjs.dev/) - Authentication library in JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework in JavaScript.
- [HeroUI](https://hero.dev/) - UI components in JavaScript.
- [Lucide](https://lucide.dev/) - Icons in JavaScript.
- [Ko-Fi Widget](https://ko-fi.com/Manage/donation-widget-setup) - Donation widget in HTML.
- [Ko-Fi Webhook](https://ko-fi.com/manage/webhooks) - Webhooks for Ko-Fi.

Enjoy! 🎉
