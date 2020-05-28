#Module to import
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

def convertData():
    numbersSample = range(1,63)
    particule = '0000'
    DIRG = 'English/Img/GoodImg/Bmp/'
    DIRB = 'English/Img/BadImag/Bmp/'
    Target = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    training_features = []
    testing_features = []

    #Browse Database
    for sample in numbersSample:
        tot = particule + str(sample)
        current_DIRG = DIRG+'Sample'+tot[-3:]
        current_DIRB = DIRB+'Sample'+tot[-3:]
        current_target = Target[sample-1]

        #Count number of good files in the current sample
        n = len([name for name in os.listdir(current_DIRG) if os.path.isfile(os.path.join(current_DIRG,name))])
        numbersGoodPics = range(1,n+1)

        #Count number of good files in the current sample
        n = len([name for name in os.listdir(current_DIRB) if os.path.isfile(os.path.join(current_DIRB,name))])
        numbersBadPics = range(1,n+1)

        #Browse all good pics
        for pics in numbersGoodPics:
            tot2 = particule + str(pics)
            path = current_DIRG+'/img'+tot[-3:]+'-'+tot2[-5:]+'.png'

            #import image
            #Convert in gray
            img = np.array(Image.open(path).convert('L'))
            
            #resize image
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

            #add to features
            training_features.append((vector,current_target))
        
        print('Add '+current_target+' to training_features')

        for pics in numbersBadPics:
            tot2 = particule + str(pics)
            path = current_DIRB+'/img'+tot[-3:]+'-'+tot2[-5:]+'.png'

            #import image
            #Convert in gray
            img = np.array(Image.open(path).convert('L'))
            
            #resize image
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

            #add to features
            testing_features.append((vector,current_target))
        
        print('Add '+current_target+' to testing_features')

    #shuffle features
    shuffle_training_features = random.sample(training_features,len(training_features))
    shuffle_testing_features = random.sample(testing_features,len(testing_features))

    print('Features as been shuffled')
    #Create X_train and Y_train for training, X_test and Y_test for testing
    X_train=[]
    Y_train=[]
    X_test=[]
    Y_test=[]

    for element in shuffle_training_features:
        x,y = element
        X_train.append(x)
        Y_train.append(y)
    
    for element in shuffle_testing_features:
        x,y = element
        X_test.append(x)
        Y_test.append(y)

    
    return X_train,Y_train,X_test,Y_test


X_train,Y_train,X_test,Y_test=convertData()

with open('training_features','wb') as f:
    pickle.dump([X_train,Y_train],f)

with open('testing_features','wb') as f:
    pickle.dump([X_test,Y_test],f)