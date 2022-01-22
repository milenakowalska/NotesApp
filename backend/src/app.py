from flask import Flask, request
from decouple import config
from flask.json import jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import uuid

app = Flask(__name__)
MONGODB_PASSWORD = config('MONGODB_PASSWORD')
app.config[
    'MONGO_URI'] = f"mongodb+srv://milena:{MONGODB_PASSWORD}@cluster0.ujpjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)
CORS(app)

db = mongo.db.notes


@app.route("/notes", methods=["GET", "POST"])
def create_or_get_notes():
    if request.method == "POST":
        db.insert_one({
            'id': str(uuid.uuid4()),
            'name': request.json['name'],
            'content': request.json['content'],
            'archived': False
        })
        return jsonify({'message': 'The note has been added successfully'})
    elif request.method == "GET":
        notes = []
        for note in db.find():
            notes.append({
                'id': note['id'],
                'name': note['name'],
                'content': note['content'],
                'archived': note['archived'],
            })
        return jsonify(notes)


@app.route("/note/<id>", methods=["GET", "DELETE", "PUT"])
def edit_note(id):
    if request.method == "GET":
        note = db.find_one({'id': id})
        return jsonify({
            'id': note['id'],
            'name': note['name'],
            'content': note['content'],
            'archived': note['archived'],
        })
    elif request.method == "DELETE":
        db.delete_one({'id': id})
        return jsonify({'message': "The note has been deleted"})
    elif request.method == "PUT":
        db.update_one({'id': id}, {
            '$set': {
                'name': request.json['name'],
                'content': request.json['content'],
                'archived': request.json['archived']
            }
        })
        return jsonify({"message": "The note has been updated successfully"})


if __name__ == "__main__":
    app.run(debug=True)