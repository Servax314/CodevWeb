import numpy as np
import matplotlib.pyplot as plt
import cv2
import PIL
from PIL import Image
import skimage
from skimage.feature import hog
from skimage import data, exposure
import os
import random
import pickle

def create_features():
    Target = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    numbersSample = range(1,63)
    particule = '0000'
    features = []
    
    for sample in numbersSample:
        tot = particule + str(sample)
        current_target = Target[sample-1]

        #Count number of files in the current sample
        DIR = 'English_threshold/Img/GoodImg/Bmp/Sample'+tot[-3:]
        n = len([name for name in os.listdir(DIR) if os.path.isfile(os.path.join(DIR,name))])
        numbersPics = range(1,n+1)

        for pics in numbersPics:
            tot2 = particule + str(pics)
            path = DIR+'/img'+tot[-3:]+'-'+tot2[-5:]+'.png'
            
            #import Image
            img = np.array(Image.open(path))
            
            #Apply HOG
            fd, hog_image = hog(img, orientations=8,pixels_per_cell=(4,4),cells_per_block=(1,1),visualize=True,multichannel=False)
            hog_image_rescalled = exposure.rescale_intensity(hog_image,in_range=(0,10))
            
            #Flattened the array
            vector_array = hog_image_rescalled.flatten()
            
            #nparray to list
            vector = vector_array.tolist()

            #add to features
            features.append((vector,current_target))
            #Write into database
        print('Add '+current_target+' to features')
    
    #shuffle features
    shuffle_features = random.sample(features,len(features))
    print('Features as been shuffled')
    #Create X and Y for training
    X_train=[]
    Y_train=[]
    
    for element in shuffle_features:
        x,y = element
        X_train.append(x)
        Y_train.append(y)
    return X_train,Y_train

X,Y=create_features()

with open('training_features_for_model','wb') as f:
    pickle.dump([X,Y],f)
