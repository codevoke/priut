from flask import Flask, request, send_file
import base64
from io import BytesIO
from PIL import Image


app = Flask(__name__)

@app.route('/', methods=["GET"])
def hello_world():
    return "hello from priut cdn"


@app.route('/image/<int:id>')
def get_photo(id: int):
    return send_file(f"./images/{id}.png")


@app.route('/upload-image', methods=["POST"])
def upload_photo():
    args = request.get_json()
    if not args or not args.get('image') or not args.get('post_id'):
        return "image or post_id missed", 400

    file = open(f"images/{args['post_id']}.png", 'w+')
    file.write(' ')
    file.close()

    base64_text = args.get('image').split(',')[-1]
    image_data = base64.b64decode(base64_text)
    image = Image.open(BytesIO(image_data))
    image.save(f"images/{args['post_id']}.png", "PNG")

    return "success", 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)