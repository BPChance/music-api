# music-api

## Overview
The Music API allows users to retrieve information about artists, their albums, and songs. Users can search for an artist, view their albums, and access song details within specific albums. The API supports pagination to efficiently handle large datasets, returning up to 7 songs per page.

This API is built with Node.js and uses Express.js for routing. The database is managed with PostgreSQL, and Swagger is used for auto-generating the API documentation.

## Features

- Artist Info: Retrieve biography, genre, and album details for an artist.

- Albums: Retrieve all albums of a specific artist.

- Songs: Retrieve songs within a specific album, with pagination support for large datasets.

- Logging: All requests are logged using Winston.

- Pagination: Song listings are paginated with a limit of 7 songs per page.

## API Documentation
API documentation is generated using swagger-jsdoc and can be accessed via Swagger UI.

check Design Documents/api_documentation.md for more

## Logging
The application uses Winston for logging. Logs are generated for:

- Info: Regular events, like fetching artist details.

- Warn: Missing or incorrect data.

- Error: Internal server errors and exceptions.

Logs are output to the console and saved to the logs/app.log file.
