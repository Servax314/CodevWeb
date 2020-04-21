import pickle
import sklearn
import joblib
from joblib import dump, load
import numpy as numpy
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier

#Import database
with open('training_features','rb') as f:
    X_test,Y_test = pickle.load(f)
print('Open testing features')

#Import model
knn = load('model.joblib')

#score
score = knn.score(X_test,Y_test)
print(score)