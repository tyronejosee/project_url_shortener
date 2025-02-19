# **Endpoints**

## **Crear una URL corta**

**POST** `/api/shorten`

- **Descripción**: Genera una URL corta a partir de una URL larga.
- **Entrada (JSON)**:

  ```json
  {
    "original_url": "https://www.ejemplo.com/pagina-larga"
  }
  ```

- **Salida (JSON)**:

  ```json
  {
    "short_url": "https://short.ly/abcd1234",
    "original_url": "https://www.ejemplo.com/pagina-larga"
  }
  ```

## **Obtener información de una URL corta**

**GET** `/api/url/{short_code}`

- **Descripción**: Obtiene información sobre una URL acortada, como su URL original y estadísticas.
- **Salida (JSON)**:

  ```json
  {
    "short_url": "https://short.ly/abcd1234",
    "original_url": "https://www.ejemplo.com/pagina-larga",
    "created_at": "2025-02-11T12:00:00Z",
    "clicks": 120
  }
  ```

## **Redirigir una URL corta**

**GET** `/{short_code}`

- **Descripción**: Redirige al usuario a la URL original.
- **Ejemplo**:
  - Un usuario accede a `https://short.ly/abcd1234`
  - El backend devuelve un **HTTP 301** o **302** hacia `https://www.ejemplo.com/pagina-larga`

## **Obtener estadísticas de una URL corta**

**GET** `/api/url/{short_code}/stats`

- **Descripción**: Devuelve estadísticas detalladas sobre el uso de la URL.
- **Salida (JSON)**:

  ```json
  {
    "short_url": "https://short.ly/abcd1234",
    "clicks": 120,
    "unique_visitors": 80,
    "last_accessed": "2025-02-11T15:30:00Z",
    "geo_distribution": {
      "US": 50,
      "MX": 30,
      "ES": 20,
      "BR": 20
    },
    "device_distribution": {
      "mobile": 90,
      "desktop": 30
    }
  }
  ```

## **Eliminar una URL corta**

**DELETE** `/api/url/{short_code}`

- **Descripción**: Elimina una URL acortada.
- **Salida (JSON)**:

  ```json
  {
    "message": "Short URL deleted successfully."
  }
  ```

## **Lista de URLs acortadas de un usuario (opcional, si hay autenticación)**

**GET** `/api/user/urls`

- **Descripción**: Devuelve todas las URLs acortadas por un usuario autenticado.
- **Salida (JSON)**:

  ```json
  [
    {
      "short_url": "https://short.ly/abcd1234",
      "original_url": "https://www.ejemplo.com/pagina-larga",
      "clicks": 120
    },
    {
      "short_url": "https://short.ly/wxyz5678",
      "original_url": "https://www.otro-ejemplo.com/",
      "clicks": 45
    }
  ]
  ```
