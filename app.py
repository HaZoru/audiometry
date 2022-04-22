from flask import Flask, render_template, request
from pymongo import MongoClient
import os
import uuid
import re

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
        # print(dbfs)
        doc = {"_id": _id, "dbfs": dbfs, "hz": hz}
        collection.insert_one(doc)
        return {"id": _id}, 200


@app.route("/additional", methods=['GET', 'POST'])
def additional():
    if request.method == 'GET':
        args = request.args
        _id = args.get('id')
        doc = collection.find_one({"_id": _id})
        if doc:
            name = doc.get('name')
            age = doc.get('age')
            sex = doc.get('sex')
            print(name, age)
            return render_template('additional.html', name=name, age=age, sex=sex)
        else:
            # print(collection.find_one({"_id": _id}))
            return "hey! some parameters are missing or invalid", 400

    if request.method == 'POST':
        form_data = request.form
        age, name, sex, _id = form_data.get('age'), form_data.get(
            'name'), form_data.get('sex'), form_data.get('id')
        valid_age, valid_name, id_is_valid, sex_is_valid = form_data_validators(
            age, name, _id, sex)
        if valid_name is None and name is not '':
            return 'incorrect format or value for: name', 400
        if valid_age is None:
            return 'incorrect format or value for: age', 400
        if not sex_is_valid:
            return 'please enter your sex', 400
        if not id_is_valid:
            return 'invalid request', 400
        add = {"$set": {"name": name, "age": age, "sex": sex}}
        collection.update_one({"_id": _id}, add)
        return f'<div style="font-size:25px;"> <strong style="color: green;">success</strong>. Thank you for your time <br> <br> id: {_id} <br> This id can be used to access your details </div>', 200


def form_data_validators(age, name, mongo_id, sex):
    id_is_valid = collection.find_one({"_id": mongo_id}) is not None
    valid_name = re.search(
        r"(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_\s]{3,24}$", name)
    sex_is_valid = sex == 'male' or sex == 'female'
    valid_age = re.search(r"^(?:[1-9]\d|0?[1-9])$", age)
    return valid_age, valid_name, id_is_valid, sex_is_valid
