import pickle
import sklearn
import joblib
from joblib import dump, load
import numpy as np
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import plot_confusion_matrix

#Import database
with open('testing_features','rb') as f:
    X_test,Y_test = pickle.load(f)
print('Open testing features')

Target = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

#Import model
knn = load('knn.joblib')

#score
score = knn.score(X_test,Y_test)
print(score)

np.set_printoptions(precision=2)

# Plot non-normalized confusion matrix
titles_options = [("Confusion matrix, without normalization", None)]
for title, normalize in titles_options:
    disp = plot_confusion_matrix(knn, X_test, Y_test,
                                 display_labels=Target,
                                 cmap=plt.cm.Blues,
                                 normalize=normalize)
    disp.ax_.set_title(title)

    print(title)
    print(disp.confusion_matrix)

plt.show()


