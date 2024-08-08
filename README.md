# Presentation Platform

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/IditAvrahami/Presentation-Platform.git
2. Install dependencies:
    npm install
3. start the server:
    npm start

**************************************************
API Endpoints


POST /api/presentations
: Create a new presentation and associated slides.
The request body should be a JSON object and should look like this:.
{
  "title": "Introduction to MongoDB",
  "authors": ["John Doe", "Jane Smith"],
  "dateOfPublishment": "2024-08-08",
  "slides": [
    {
      "title": "Slide 1: Overview",
      "content": "Introduction to MongoDB and its features."
    },
    {
      "title": "Slide 2: Schema Design",
      "content": "Best practices for designing schemas in MongoDB."
    }
  ]
}
Response:
Success-
Status Code: 201 Created
Body: The response body contains the created presentation object with references to the newly created slides.
Error-
Status Code: 400 Bad Request
Body: If there is an error with the request (e.g., invalid input data), the response body will contain an error message.


GET /api/presentations/
:  retrieves a list of all presentations from the database. Each presentation document includes references to its associated slides, which are populated in the response.
No request body is needed for this endpoint.
Response:
Success-
Status Code: 200 OK
Body: The response body contains an array of presentation objects. Each presentation includes details such as title, authors, date of publish, and populated slide information.
Error:
Status Code: 400 Bad Request (or other relevant status codes in case of specific errors)
Body: If there is an error during the retrieval process, the response body will contain an error message.


GET /api/presentations/:title
:retrieves a specific presentation by its title. The response includes the presentation details along with the associated slides, which are populated in the response.
No request body is needed for this endpoint.
Response:
Success-
Status Code: 200 OK
Body: The response body contains the presentation object with details such as title, authors, date of publish, and populated slide information.
Error-
Status Code: 404 Not Found
Body: If the presentation with the specified title is not found, the response body will contain an error message.


DELETE /api/presentations/:title
: This endpoint deletes a specific presentation by its title, along with all associated slides. 
Response:
Success-
Status Code: 204 No Content
Body: No content is returned in the response body, indicating that the deletion was successful.
Error-
Status Code: 404 Not Found
Body: If the presentation with the specified title is not found, the response body will contain an error message.


PUT /api/presentations/authors/:title
: Altering the Authors List (Deletes the previous list of authors and updates to the current one)
To add, The request expects an array of authors in the request body and updates the presentation's authors list accordingly.
the body of the message should look like this:
{
  "authors": ["New Author One", "New Author Two"]
}
Response:
Success-
Status Code: 200 OK
Body: The response body contains the updated presentation object with the new authors list.
Error-
Status Code: 400 Bad Request
Body: If the request body is not in the correct format or contains invalid data, the response body will contain an error message.


PUT /api/presentations/authorsAdd/:title
:Add a new author to the existing authors list of a specific presentation identified by its title. It checks if the author already exists in the list and only adds the author if they are not already present.
To add, the body of the message should look like this:
{
  "author": "New Author"
}
Response:
Success-
Status Code: 200 OK
Body: The response body contains the updated presentation object with the new author added to the authors list.
Error-
Status Code: 400 Bad Request
Body: If the request body is not in the correct format, if the author is already in the list, or if any other validation fails, the response body will contain an error message.


POST /api/slides/:title
: add a new slide to a specific presentation identified by its title. The request body should contain the data for the new slide.
The request body should be a JSON object and the body of the message should look like this:
{
  "title": "New Slide Title",
  "content": "Content of the new slide."
}
Response:
Success-
Status Code: 201 Created
Body: The response body contains the newly created slide object.
Error-
Status Code: 404 Not Found
Body: If the presentation with the specified title is not found, the response body will contain an error message.


PUT /api/slides/:id
: update an existing slide identified by its ID. The request body should contain the fields to be updated for the slide.
The request body should be a JSON object and the body of the message should look like this:
{
  "title": "Updated Slide Title",
  "content": "Updated content for the slide."
}
Response:
Success-
Status Code: 200 OK
Body: The response body contains the updated slide object.
Error-
Status Code: 404 Not Found
Body: If the slide with the specified ID is not found, the response body will contain an error message.


DELETE /api/slides/:id
: Deletes a specific slide identified by its ID.
Parameters - id (Path Parameter): The ID of the slide to be deleted. This should be included in the URL path.
Response:
Success-
Status Code: 204 No Content
Body: No content is returned, indicating that the deletion was successful.
Error-
Status Code: 404 Not Found
Body: If the slide with the specified ID is not found, the response body will contain an error message.

**************************************************