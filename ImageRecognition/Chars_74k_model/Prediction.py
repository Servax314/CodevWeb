import pickle
from PIL import Image
import skimage
from skimage.feature import hog
from skimage import data, exposure
import random
import sklearn
import joblib
from joblib import dump, load
import numpy as numpy
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier

#import your image
path = ''

img = np.array(Image.open(path).convert('L'))

#transform your image
img_resize = cv2.resize(img, dsize=(75,75), interpolation=cv2.INTER_CUBIC)

#Otsu threshold
blur = cv2.GaussianBlur(img_resize,(5,5),0)
ret,img_thresh = cv2.threshold(blur,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)

#dilatation
kernel = np.ones((5,5),np.uint8)
img_dilate = cv2.dilate(img_thresh,kernel,iterations=1)

#convert to nparray
im = np.array(Image.fromarray(img_dilate))

#Apply HOG
fd, hog_image = hog(im, orientations=8,pixels_per_cell=(4,4),cells_per_block=(1,1),visualize=True,multichannel=False)
hog_image_rescalled = exposure.rescale_intensity(hog_image,in_range=(0,10))

#Flattened the array
vector_array = hog_image_rescalled.flatten()

#nparray to list
vector = vector_array.tolist()

#Import your model
filename = ''
dump(model,filename)

prediction = model.predict(vector)
print(prediction)