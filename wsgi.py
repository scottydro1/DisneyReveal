from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

import json
import os

PROGRESS_FILE = "progress.json"

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, "r") as f:
            return json.load(f)
    else:
        return {"kayce": False, "kinsley": False, "kalia": False, "jessica": False}

def save_progress(progress):
    with open(PROGRESS_FILE, "w") as f:
        json.dump(progress, f, indent=4)

@app.route('/')
def index():
    progress = load_progress()

    return render_template("index.html", progress=progress)
@app.route('/enter', methods=['POST'])
def enter():
    name = request.form.get('name', '').lower()
    progress = load_progress()

    if name in progress:
        return redirect(url_for('room', name=name))
    return "Name not recognized", 404

@app.route('/room/<name>')
def room(name):
    name = name.lower()
    progress = load_progress()
    if name not in progress:
        return "No such room", 404
    return render_template(f'{name}.html', crown_collected=progress[name])

@app.route('/complete/<name>')
def complete(name):
    name = name.lower()
    progress = load_progress()
    if name in progress:
        progress[name] = True
        save_progress(progress)
    return redirect(url_for('index'))

@app.route('/throne')
def throne_room():
    progress = load_progress()
    all_ready = all(progress.values())
    return render_template('throne_room.html', progress=progress, all_ready=all_ready)

# Only for direct run; on PythonAnywhere, it will use this as WSGI entry
if __name__ == '__main__':
    app.run(debug=True)
