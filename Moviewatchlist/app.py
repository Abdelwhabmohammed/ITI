from flask import Flask, render_template, request, redirect, url_for

# Initialize the Flask app
app = Flask(__name__)

movies = [
    {'id': 1, 'title': 'The Shawshank Redemption', 'year': 1994},
    {'id': 2, 'title': 'The Godfather', 'year': 1972},
    {'id': 3, 'title': 'The Dark Knight', 'year': 2008}
]
next_movie_id = 4


# Route to display all movies the homepage
@app.route('/')
def index():
    """Renders the main page with the list of movies."""
    return render_template('index.html', movies=movies)

# Route to add a new movie
@app.route('/add', methods=['GET', 'POST'])
def add_movie():
    """Handles both displaying the 'add movie' form and processing the form data."""
    global next_movie_id

    if request.method == 'POST':
        # Get data from the form
        movie_title = request.form.get('title')
        movie_year = request.form.get('year')

        if not movie_year:
            movie_year = "N/A"

        if movie_title:
            new_movie = {
                'id': next_movie_id,
                'title': movie_title,
                'year': movie_year
            }
            movies.append(new_movie)
            next_movie_id += 1 
        
        # Redirect back to the homepage
        return redirect(url_for('index'))

    return render_template('add_movie.html')


@app.route('/delete/<int:movie_id>', methods=['POST'])
def delete_movie(movie_id):
    """Deletes a movie from the list based on its ID."""
    # Use a list comprehension to create a new list without the deleted movie
    global movies
    movies = [movie for movie in movies if movie['id'] != movie_id]
    
    # Redirect back to the homepage
    return redirect(url_for('index'))

@app.route('/edit/<int:movie_id>', methods=['GET', 'POST'])
def edit_movie(movie_id):
    
    # Find the movie in our list by its ID.
    movie_to_edit = next((movie for movie in movies if movie['id'] == movie_id), None)

    # If no movie is found with that ID, redirect to the homepage.
    if not movie_to_edit:
        return redirect(url_for('index'))

    if request.method == 'POST':
        # Get the updated data
        new_title = request.form.get('title')
        new_year = request.form.get('year')

        # Update the movie's dictionary in the list
        if new_title:
            movie_to_edit['title'] = new_title
            movie_to_edit['year'] = new_year if new_year else "N/A"
        
        # Redirect back to the homepage
        return redirect(url_for('index'))

    return render_template('edit_movie.html', movie=movie_to_edit)

if __name__ == '__main__':
    app.run(debug=True)