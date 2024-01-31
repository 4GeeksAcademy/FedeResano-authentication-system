from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)

CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data["email"]

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Este correo ya esta registrado"}), 400

    password = bcrypt.generate_password_hash(data["password"])
    user = User()
    user.email = email
    user.password = password
    user.is_active = True

    db.session.add(user)
    db.session.commit()
    return "User created succesfully."

@api.route("/login", methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email = data["email"]).first()
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 401
    if not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Contraseña invalida"}), 401
    payload={"email": user.email, "nivel": "admin"}
    token=create_access_token(identity=user.id, additional_claims=payload)
    return jsonify({"token": token})
    
@api.route("/private", methods=["GET"])
@jwt_required()
def handle_private():
    id=get_jwt_identity()
    payload=get_jwt()
    return jsonify({"id": id, "rol": payload["nivel"]})