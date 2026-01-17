💸 Gastos App
📌 Descripción del proyecto

Aplicación web para la gestión de gastos, compuesta por un frontend y un backend, con una base de datos PostgreSQL desplegada en entorno local mediante Docker.
Permite listar, crear, editar y eliminar gastos, manteniendo persistencia de datos y separación clara de responsabilidades.

🛠️ Tecnologías utilizadas
Frontend

Vue 3

Nuxt 3

Nuxt UI

TypeScript

Node.js

Backend

NestJS

TypeScript

PostgreSQL

TypeORM

Docker

Infraestructura

Docker

Docker Compose

⚙️ Instrucciones de instalación local
1️⃣ Clonar el repositorio
git clone <url-del-repositorio>
cd <nombre-del-proyecto>

2️⃣ Levantar la base de datos (Docker)

Ubicarse en la carpeta:

cd Docker


Ejecutar:

docker compose up


Esto creará y levantará el contenedor de PostgreSQL en el entorno local.

3️⃣ Ejecutar el Backend

Ubicarse en:

cd BackEnd/gastos-backend


Instalar dependencias:

npm install


Ejecutar en modo desarrollo:

npm run start:dev

4️⃣ Ejecutar el Frontend

Ubicarse en:

cd FrontEnd/gastos-frontend


Instalar dependencias:

npm install


Ejecutar en modo desarrollo:

npm run dev

🔐 Variables de entorno requeridas
Backend (.env)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gastos_db


Ajustar los valores según la configuración del contenedor Docker.

Frontend (.env)
API_BASE_URL=http://localhost:3000

🗄️ Migraciones y Seeds
Migraciones

Si usas TypeORM:

npm run typeorm migration:run

Seeds

Para insertar datos iniciales, ejecutar el archivo SQL ubicado en:

Seed BD/Insert 10 records.sql


Este archivo contiene 10 registros de ejemplo para la tabla de gastos.

🌐 URLs de la aplicación desplegada
Frontend
http://localhost:3000

Backend (API)
http://localhost:8080


(Las URLs pueden variar dependiendo de la configuración local o del despliegue en producción)