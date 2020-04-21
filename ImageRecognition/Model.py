import pickle
import sklearn
import joblib
from joblib import dump, load
import numpy as numpy
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier

#Import database
""" with open('training_features','rb') as f:
    X_test,Y_test = pickle.load(f)
print('Open testing features') """

with open('training_features_for_model','rb') as f:
    X_train,Y_train = pickle.load(f)
print('Open training features')

#7705 sample for training
#4798 sample for testing

#Creating and training the model
knn = KNeighborsClassifier(n_neighbors=12,algorithm='brute')
knn.fit(X_train,Y_train)
print('model as been trained')

#saving the model
dump(knn,'model.joblib')

#import model
#knn = load('model.joblib')

#To test our model
#knn.score(X_test,Y_test)