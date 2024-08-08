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
: Create a new presentation and add existing slides

GET /api/presentations/
: Fetch a presentation by title

POST /api/presentations/withSlides
: Create a new presentation and new slides

POST /api/slides/
: Add a slide to a presentation

PUT /api/slides/
: Alter a slide

DELETE /api/slides/
: Delete a slide

DELETE /api/presentations/
: Delete a presentation

GET /api/presentations
: Get all presentations

PUT /api/presentations/authors/:title
: Altering the Authors List (Deletes the previous list of authors and updates to the current one)
To add, the body of the message should look like this:
{
  "authors": ["New Author One", "New Author Two"]
}

PUT /api/presentations/authorsAdd/:title
:Added an author to the current list
To add, the body of the message should look like this:
{
  "author": "New Author"
}

**************************************************