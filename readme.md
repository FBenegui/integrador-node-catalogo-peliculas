# Peliculario · API REST de Catálogo de Películas

API REST para gestionar una **bitácora y catálogo personal de películas** (estilo Letterboxd). Permite registrar las películas vistas, asignarles una valoración personal (puntaje de 1 a 5 stars), escribir reseñas críticas y consultar la base de datos completa.

Trabajo práctico integrador · Bootcamp 5.0 · Módulo Node.js.

> **Estado: Etapa 1 (Punto de Control).** Proyecto configurado con Node.js, Express, TypeScript, conexión a MongoDB Atlas y CRUD completo de películas funcionando en arquitectura por capas, previo a la integración de autenticación de usuarios.

---

## Tecnologías

- Node.js + TypeScript
- Express 4 / Express 5
- MongoDB Atlas + Mongoose
- dotenv

---

## Estructura del proyecto

El proyecto está organizado según la **estructura por componentes de negocio**, separando responsabilidades en capas (rutas → controlador → servicio → acceso a datos / DAO):

```text
Peliculario/
├── src/
│   ├── componentes/
│   │   └── pelicula/
│   │       ├── routes.ts       # Rutas de /api/peliculas
│   │       ├── controller.ts   # Manejo de req/res, try/catch y códigos HTTP
│   │       ├── service.ts      # Validaciones y reglas de negocio
│   │       ├── dao.ts          # Métodos de acceso a datos con Mongoose
│   │       └── modelo.ts       # Esquema e interfaz TypeScript de Pelicula
│   ├── db.ts                   # Conexión a MongoDB Atlas
│   └── app.ts                  # Servidor Express e inicialización
├── .env.ejemplo                # Plantilla de variables de entorno
├── .gitignore                  # Exclusión de node_modules, .env y dist
├── package.json
├── tsconfig.json
└── README.md
```

---

## Instalación

**Requisitos previos:** Node.js 18 o superior y un cluster en MongoDB Atlas.

```bash
git clone https://github.com/FBenegui/integrador-node-catalogo-peliculas.git
cd integrador-node-catalogo-peliculas
npm install
```

---

## Variables de entorno

Copiá el archivo `.env.ejemplo` como `.env` en la raíz del proyecto y asigná los valores correspondientes:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto de escucha del servidor Express | `3000` |
| `MONGO_URI` | Cadena de conexión completa a MongoDB Atlas | `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/peliculario` |
| `JWT_SECRET` | Clave secreta para la firma de tokens (Etapa 2) | `secreto_super_seguro_jwt` |

---

## Ejecución

| Comando | Función |
|---|---|
| `npm run dev` | Inicia el servidor en modo desarrollo con `ts-node-dev` (reinicio automático en cada cambio) |
| `npm run build` | Compila el código de TypeScript a JavaScript dentro de la carpeta `dist/` |
| `npm start` | Corre la aplicación compilada en producción desde `dist/` |

Una vez levantado el servidor correctamente, la consola mostrará:

```text
Servidor corriendo en http://localhost:3000
🟢 Conexión exitosa a MongoDB Atlas
```

---

## Modelo: Película

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `titulo` | string | **Sí** | Título de la película |
| `director` | string | **Sí** | Director/a de la obra |
| `genero` | string | **Sí** | Género cinematográfico (ej: Ciencia Ficción, Drama, Acción) |
| `puntaje` | number | **Sí** | Calificación personal del 1 al 5 |
| `review` | string | No | Opinión o reseña escrita sobre la película |
| `año` | number | No | Año de estreno original |

*Mongoose incluye automáticamente `_id`, `createdAt` y `updatedAt`.*

### Validaciones de negocio (capa de servicio)

1. **Rango de Puntaje:** El campo `puntaje` debe ser obligatoriamente un número entero entre **1 y 5**.
2. **Año de Estreno:** Si se ingresa el campo `año`, debe estar comprendido entre **1888** (origen del cine) y el año corriente (`2026`).
3. **Campos Requeridos:** Rechaza cualquier petición que intente guardar una película sin `titulo`, `director`, `genero` o `puntaje`.
4. **Validación de Identificador:** Verifica que el parámetro `:id` enviado en las rutas GET, PUT y DELETE corresponda a un formato `ObjectId` de Mongo.

---

## Endpoints

URL base: `http://localhost:3000`

| Método | Ruta | Descripción | Estado Éxito | Estados Error |
|---|---|---|---|---|
| `GET` | `/api/peliculas` | Retorna la lista completa de películas registradas | 200 OK | 500 |
| `GET` | `/api/peliculas/:id` | Retorna el detalle de una película por su ID | 200 OK | 404, 500 |
| `POST` | `/api/peliculas` | Registra una nueva película en la bitácora | 201 Created | 400, 500 |
| `PUT` | `/api/peliculas/:id` | Modifica datos de una película guardada | 200 OK | 400, 404, 500 |
| `DELETE` | `/api/peliculas/:id` | Elimina una película de la base de datos | 200 OK | 404, 500 |

---

### Ejemplos de Peticiones

**Crear una película** · `POST /api/peliculas`

```json
{
  "titulo": "Inception",
  "director": "Christopher Nolan",
  "genero": "Sci-Fi",
  "puntaje": 5,
  "review": "Una obra maestra sobre el mundo de los sueños.",
  "año": 2010
}
```

Respuesta `201 Created`:

```json
{
  "_id": "67300c14f7b23e12a4b890a1",
  "titulo": "Inception",
  "director": "Christopher Nolan",
  "genero": "Sci-Fi",
  "puntaje": 5,
  "review": "Una obra maestra sobre el mundo de los sueños.",
  "año": 2010,
  "createdAt": "2026-11-09T22:30:00.123Z",
  "updatedAt": "2026-11-09T22:30:00.123Z",
  "__v": 0
}
```

**Modificar una película** · `PUT /api/peliculas/:id`

```json
{
  "puntaje": 4,
  "review": "Le bajo un punto tras volver a verla."
}
```

Respuesta `200 OK` con el documento actualizado.

**Eliminar una película** · `DELETE /api/peliculas/:id`

Respuesta `200 OK`:

```json
{
  "message": "Película eliminada correctamente"
}
```

---

### Manejo de Errores

Todos los errores capturados responden con la estructura JSON bajo la clave `error`:

```json
{
  "error": "El puntaje debe estar entre 1 y 5"
}
```

| Código HTTP | Escenario |
|---|---|
| **400 Bad Request** | Petición con campos faltantes o incumplimiento de validaciones de negocio. |
| **404 Not Found** | El ID consultado no pertenece a ninguna película en la base o la ruta no existe. |
| **500 Internal Server Error** | Excepciones no controladas o problemas de conexión con MongoDB Atlas. |

---

## Pautas para la ejecución de pruebas con Thunder Client

Para la evaluación del Punto de Control de la Semana 1, se deben ejecutar y documentar los casos de prueba en el cliente de HTTP (Thunder Client) siguiendo el orden establecido:

1. **Prueba 01 · Obtener catálogo vacío (`GET /api/peliculas`)**
   - **Objetivo:** Verificar la lectura limpia contra MongoDB Atlas.
   - **Esperado:** `200 OK`, arreglo `[]`.

2. **Prueba 02 · Crear película válida (`POST /api/peliculas`)**
   - **Objetivo:** Registrar un documento exitosamente.
   - **Body JSON:** Datos completos (ej: `"puntaje": 5`, `"año": 2010`).
   - **Esperado:** `201 Created` con el `_id` autogenerado *(copiar para las siguientes pruebas)*.

3. **Prueba 03 · Error de validación: Puntaje inválido (`POST /api/peliculas`)**
   - **Objetivo:** Probar el manejo de errores de la capa de servicio.
   - **Body JSON:** Usar `"puntaje": 10`.
   - **Esperado:** `400 Bad Request` con mensaje de error en el rango de puntaje.

4. **Prueba 04 · Error de validación: Año fuera de rango (`POST /api/peliculas`)**
   - **Objetivo:** Probar validación de año mínimo/máximo.
   - **Body JSON:** Usar `"año": 1800`.
   - **Esperado:** `400 Bad Request` con mensaje de año inválido.

5. **Prueba 05 · Obtener película por ID existente (`GET /api/peliculas/:id`)**
   - **Objetivo:** Búsqueda puntual por parámetro de ruta.
   - **URL:** `http://localhost:3000/api/peliculas/<ID_CREADO_EN_PRUEBA_02>`
   - **Esperado:** `200 OK` con el detalle de la película.

6. **Prueba 06 · Obtener película por ID inexistente (`GET /api/peliculas/:id`)**
   - **Objetivo:** Control de recurso no encontrado.
   - **URL:** `http://localhost:3000/api/peliculas/64f000000000000000000000`
   - **Esperado:** `404 Not Found` con `{"error": "Película no encontrada"}`.

7. **Prueba 07 · Actualizar película (`PUT /api/peliculas/:id`)**
   - **Objetivo:** Edición parcial o total de la entidad.
   - **URL:** Usar el `:id` válido.
   - **Body JSON:** `{"puntaje": 4}`
   - **Esperado:** `200 OK` con los datos actualizados.

8. **Prueba 08 · Eliminar película (`DELETE /api/peliculas/:id`)**
   - **Objetivo:** Borrado de registro en MongoDB Atlas.
   - **URL:** Usar el `:id` válido.
   - **Esperado:** `200 OK` con `{"message": "Película eliminada correctamente"}`.

9. **Prueba 09 · Reintentar eliminación de ID ya borrado (`DELETE /api/peliculas/:id`)**
   - **Objetivo:** Verificar comportamiento ante borrado repetido.
   - **URL:** Repetir el mismo `:id` de la prueba 08.
   - **Esperado:** `404 Not Found`.