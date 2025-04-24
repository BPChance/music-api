# API Documentation

This documentation covers the available API endpoints
## Endpoints

**GET /artist**

**Description:** Retrieves detailed information about a specific artist, including their biography, top songs, and albums.

**Request Example:**
```
/artist?artist_name=Nai Palm
```
---
**GET /artist/albums**

**Description:** Get a list of albums by a specific artist.

**Request Example:**
```
/artist/albums?artist_name=Nai Palm
```
---
**GET /albums/{album_id}/songs**

**Description:** Get a list of songs in a specific album, with pagination.

**Request Example:**
```
/albums/1/songs
```

## Testing
You can use Swagger UI to test the API endpoints. Go to http://localhost:3000/api-docs to test.

Alternatively you can use Postman or curl

**Example Curl Request:**
```
curl -X GET "http://localhost:3000/artist?artist_name=Nai Palm"
```