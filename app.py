from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import os
import uuid

app = Flask(__name__)

client = MongoClient(os.environ['DB_URI'])
db = client["audiometry"]
collection = db["threshhold-details"]


@app.route("/")
def intro():
    return render_template('intro.html')


@app.route("/test")
def test():
    return render_template('player.html')


@app.route("/submit", methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        data = request.get_json()
        _id = uuid.uuid4().hex
        dbfs = data["dbfs"]
        hz = data["hz"]
        print(dbfs)
        doc = {"_id": _id, "dbfs": dbfs, "hz": hz}
        collection.insert_one(doc)
        return {"id": _id}, 200


@app.route("/additional", methods=['GET', 'POST'])
def additional():
    if request.method == 'GET':
        args = request.args
        _id = args.get('id')
        if collection.find_one({"_id": _id}):
            return render_template('additional.html')
        else:
            return "hey! some parameters are missing or invalid", 400
