from flask import Flask, request, jsonify
from scrape import search_serpapi
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
import json
import requests
from MLmodel import animalDetect
from MLmodel2 import plantDetect
from PIL import Image
# from tensorflow.keras.preprocessing import image
import wikipedia
from flask_cors import CORS  # Import CORS
import pathlib
import textwrap
from google.generativeai import GenerativeModel
model = GenerativeModel("gemini-pro")
import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown

import cloudinary
import cloudinary.uploader
import cloudinary.api
# import cloudinary_config

cloudinary.config(
  cloud_name = 'ddk3p3a2g',
  api_key = '195759785195219',
  api_secret = 'WaxgM7f1aiGj1DxK-TovgwmikwY'
)

def get_user_id_by_email(email):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    if user:
        return user['id']
    return None

def generate_content(species):
    print("generating for:",species)
    API_KEY="AIzaSyA3EHDClVvc8lJUxoqlWEveucIIoF0HiCo"
    data = {
    "contents": [
        {
            "parts": [
                {
                    "text": "Give one para about the animal"+species
                }
            ]
        }
    ]
}   
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}"
    response = requests.post(url, json=data)
    print( response.json()['candidates'][0]['content']['parts'][0]['text'])
    return response.json()['candidates'][0]['content']['parts'][0]['text']

def generate_content2(species):
    print("generating for:",species)
    API_KEY="AIzaSyA3EHDClVvc8lJUxoqlWEveucIIoF0HiCo"
    data = {
    "contents": [
        {
            "parts": [
                {
                    "text": "Give one para about the plant"+species
                }
            ]
        }
    ]
}   
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}"

# Make POST request to the Google Cloud API
    response = requests.post(url, json=data)
    print( response.json()['candidates'][0]['content']['parts'][0]['text'])
    return response.json()['candidates'][0]['content']['parts'][0]['text']



# API endpoint


# def to_markdown(text):
#   text = text.replace('•', '  *')
#   return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
# from google.colab import userdata
app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'flask_auth'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# JWT configuration
app.config['JWT_SECRET_KEY'] = '123'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    address=data.get('address')
    phone=data.get('phone')
    name=data.get('name')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cur.fetchone()

    if user:
        return jsonify({"error": "User already exists"}), 409

    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    cur.execute("INSERT INTO users (email, password_hash,phone,address,name) VALUES (%s, %s,%s,%s,%s)", (email, password_hash,phone,address,name))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()

    if user and bcrypt.check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity=email)
        return jsonify({"token": access_token}), 200

    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/animals', methods=['POST'])
@jwt_required()
def animals():
    # for header, value in request.headers.items():
    #     print(f'{header}: {value}')
    current_user_email = get_jwt_identity()

    # Rest of your code
    # print("Authenticated user:", current_user_email)
    # print("Raw request data:", request.get_data())
    # print("type", type(request.get_data()))
    # data = json.loads(request.get_data(as_text=True))
    print(request.is_json)
    # print("Parsed JSON data:",data )
    # data=request.get_json()['image_url']
    # print(data)
    # return "hello"
   
    file = request.files['file']
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')
    # print("latitude",latitude)
    # for key, value in file.items():
    #         print(f"Key: {key}, Value: {value}")
    # print(file)
        
    # file = request.files['file']
    
    # Save the file to ./uploads
    basepath = os.path.dirname(__file__)
    file_path = os.path.join(basepath, 'Dataset', file.filename)
    file.save(file_path)

    # # Load the image and preprocess it
    prediction_result = animalDetect(file_path)
    
    output_string = prediction_result[0].upper() + prediction_result[1:]
    # return prediction_result
    print("prdicted is:",output_string)
    descp=generate_content(output_string)
    
    image_url=""
    try:
        response = cloudinary.uploader.upload(file_path)
        image_url = response['url']
        print(image_url)
    except Exception as e:
        print(f"An error occurred: {e}")   
    
    cur = mysql.connection.cursor()
    link1, link2 = search_serpapi(output_string+" animal")
    print(link1)
    print(link2)
    id=get_user_id_by_email(current_user_email)
    print("id:",id)
    cur.execute("INSERT INTO user_images (user_id, image_url,latitude,longitude,descp,species,link1,link2) VALUES (%s, %s,%s,%s,%s,%s,%s,%s)", (id, image_url,latitude,longitude,descp,output_string,link1,link2))
    mysql.connection.commit()


    return jsonify("animal added successfully"), 200   
    # descp = wikipedia.summary(output_string)
    
    # print(descp)
    # return descp

@app.route('/plants', methods=['POST'])
@jwt_required()
def plants():
    # for header, value in request.headers.items():
    #     print(f'{header}: {value}')
    current_user_email = get_jwt_identity()

    # Rest of your code
    # print("Authenticated user:", current_user_email)
    # print("Raw request data:", request.get_data())
    # print("type", type(request.get_data()))
    # data = json.loads(request.get_data(as_text=True))
    print(request.is_json)
    # print("Parsed JSON data:",data )
    # data=request.get_json()['image_url']
    # print(data)
    # return "hello"
   
    file = request.files['file']
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')
    # print("latitude",latitude)
    # for key, value in file.items():
    #         print(f"Key: {key}, Value: {value}")
    # print(file)
        
    # file = request.files['file']
    
    # Save the file to ./uploads
    basepath = os.path.dirname(__file__)
    file_path = os.path.join(basepath, 'Dataset', file.filename)
    file.save(file_path)

    # # Load the image and preprocess it
    prediction_result = plantDetect(file_path)
    
    output_string = prediction_result[0].upper() + prediction_result[1:]
    # return prediction_result
    print("prdicted is:",output_string)
    descp=generate_content2(output_string)
    
    image_url=""
    try:
        response = cloudinary.uploader.upload(file_path)
        image_url = response['url']
        print(image_url)
    except Exception as e:
        print(f"An error occurred: {e}")   
    
    cur = mysql.connection.cursor()
    link1=""
    link2=""
    ans = search_serpapi(output_string+" animal")
    print(ans)
    if(len(ans)==2):
        link1,link2=ans
    else:
        link1=ans[0]    
    print(link1)
    print(link2)
    id=get_user_id_by_email(current_user_email)
    print("id:",id)
    cur.execute("INSERT INTO user_images (user_id, image_url,latitude,longitude,descp,species,link1,link2) VALUES (%s, %s,%s,%s,%s,%s,%s,%s)", (id, image_url,latitude,longitude,descp,output_string,link1,link2))
    mysql.connection.commit()


    return jsonify("animal added successfully"), 200   
    # descp = wikipedia.summary(output_string)
    
    # print(descp)
    # return descp


@app.route('/getUserSpecies', methods=['GET'])
@jwt_required()
def get_user_species():
    try:
        # Get the current user's email from the JWT token
        current_user_email = get_jwt_identity()
        # Get the user ID associated with the email
        user_id = get_user_id_by_email(current_user_email)

        if user_id is None:
            return jsonify({'error': 'User not found'}), 404

        # Query the user_images table for entries associated with the user_id
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM user_images WHERE user_id = %s ORDER BY recording_time DESC", (user_id,))
        user_species_data = cur.fetchall()

        # Convert the data to JSON format
        user_species_json = []
        for entry in user_species_data:
            user_species_json.append({
                'species':entry['species'],
                'image_url': entry['image_url'],
                'latitude': entry['latitude'],
                'longitude': entry['longitude'],
                'descp': entry['descp'],
                'link1': entry['link1'],
                'link2': entry['link2'],
                'recording_time': entry['recording_time'].isoformat()  # Convert datetime to string
            })

        return jsonify(user_species_json), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
