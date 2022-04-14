from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def intro():
    return render_template('intro.html')


@app.route("/test")
def test():
    return render_template('player.html')


@app.route("/results", methods=['POST', 'GET'])
def result():
    data = request.get_json()
    return jsonify(data)
