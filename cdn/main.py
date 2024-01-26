
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request, send_file
import base64
from io import BytesIO
from PIL import Image
import os


app = Flask(__name__)


@app.route('/', methods=["GET"])
def hello_world():
    return "hello from priut cdn {}".format(os.getcwd())


@app.route('/image/<int:id>')
def get_photo(id: int):
    return send_file(f"./images/{id}.png")


@app.route('/upload-image', methods=["POST"])
def upload_photo():
    args = request.get_json()
    if not args or not args.get('image') or not args.get('post_id'):
        return "image or post_id missed", 400

    file = open(f"mysite/images/{args['post_id']}.png", 'w+')
    file.write(' ')
    file.close()

    base64_text = args.get('image').split(',')[-1]
    image_data = base64.b64decode(base64_text)
    image = Image.open(BytesIO(image_data))
    image.save(f"mysite/images/{args['post_id']}.png", "PNG")

    return f"http://codevoke.pythonanywhere.com/image/{args['post_id']}"
