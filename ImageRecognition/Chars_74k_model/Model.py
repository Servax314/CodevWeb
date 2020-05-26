import pickle
import sklearn
import joblib
from joblib import dump, load
import numpy as np
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
import sknn
from sknn.mlp import Classifier, Layer

#Import database
""" with open('testing_features','rb') as f:
    X_test,Y_test = pickle.load(f)
print('Open testing features') """

with open('training_features','rb') as f:
    X_train,Y_train = pickle.load(f)
print('Open training features')

X_train = np.array(X_train)
Y_train = np.array(Y_train)

#7705 sample for training
#4798 sample for testing

#Creating and training the model

#model = KNeighborsClassifier(n_neighbors=62,algorithm='brute')


model = Classifier(
    layers=[
        Layer("Rectifier", units=600),
		Layer("Rectifier", units=300),
		#Layer("Rectifier", units=100),
        Layer("Softmax")],
    learning_rate=0.01,
	dropout_rate=0.3,
	valid_size=0.15,
	learning_momentum=0.4,
	batch_size=10,
	#learning_rule='adam',
    n_iter=100,
	verbose=True)



model.fit(X_train,Y_train)
print('model as been trained')

#saving the model
dump(model,'model.joblib')

#import model
#knn = load('model.joblib')

#To test our model
#knn.score(X_test,Y_test)