
import pickle
import tensorflow as tf
import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.applications import VGG16
from tensorflow.keras.layers import Dense, Flatten, Dropout
from tensorflow.keras.models import Model
from PIL import Image
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.preprocessing import image
import numpy as np






def animalDetect(file_path):
    img = image.load_img(file_path, target_size=(224, 224))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0
    with open("model_pickle",'rb') as f:
        model = pickle.load(f)

    train_datagen = ImageDataGenerator(rescale=1./255,
                                       shear_range=0.2,
                                       zoom_range=0.2,
                                       horizontal_flip=True)

    print(os.getcwd())
    training_set = train_datagen.flow_from_directory('Dataset/Training_set',
                                                     target_size=(224, 224),  
                                                     batch_size=32,
                                                     class_mode='categorical')

    # Preprocessing the Test set
    test_datagen = ImageDataGenerator(rescale=1./255)
    test_set = test_datagen.flow_from_directory('Dataset/Test_set',
                                                target_size=(224, 224),  
                                                batch_size=32,
                                                class_mode='categorical')

    # Make prediction
    result = model.predict(img)
    predicted_class = np.argmax(result, axis=-1)
    class_indices = training_set.class_indices
    for class_name, index in class_indices.items():
        if index == predicted_class:
            prediction = class_name
    print("class of animal: ",class_name)        
    # return jsonify({'prediction': prediction})
    return prediction

