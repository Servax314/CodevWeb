import numpy as np
import matplotlib.pyplot as plt
import PIL
from PIL import Image
import time
import cv2
import os



def createDatabase_gray():
    numbersSample = range(1,63)
    particule = '0000'
    
    for sample in numbersSample:
        tot = particule + str(sample)
        
        #Creating new folder 
        DIRN = 'English_gray/Img/BadImag/Bmp/Sample'+tot[-3:]
        os.mkdir(DIRN)

        #Count number of files in the current sample
        DIRF = 'English/Img/BadImag/Bmp/Sample'+tot[-3:]
        n = len([name for name in os.listdir(DIRF) if os.path.isfile(os.path.join(DIRF,name))])
        numbersPics = range(1,n+1)

        for pics in numbersPics:
            tot2 = particule + str(pics)
            pathF = DIRF+'/img'+tot[-3:]+'-'+tot2[-5:]+'.png'
            pathN = DIRN+'/img'+tot[-3:]+'-'+tot2[-5:]+'.png'
            
            #RGB to gray
            iar = np.array(Image.open(pathF).convert('L'))
            im = Image.fromarray(iar)
            #Save the png files in the new directory sample
            im.save(pathN)
        
        print('Done for Sample'+tot[-3:])


def createDatabase_threshold():
    numbersSample = range(1,63)
    particule = '0000'
    
    for sample in numbersSample:
        tot = particule + str(sample)
        
        #Creating new folder 
        DIRN = 'English_threshold/Img/BadImag/Bmp/Sample'+tot[-3:]
        os.mkdir(DIRN)

        #Count number of files in the current sample
        DIRF = 'English_gray/Img/BadImag/Bmp/Sample'+tot[-3:]
        n = len([name for name in os.listdir(DIRF) if os.path.isfile(os.path.join(DIRF,name))])
        numbersPics = range(1,n+1)

        for pics in numbersPics:
            tot2 = particule + str(pics)
            pathF = DIRF+'/img'+tot[-3:]+'-'+tot2[-5:]+'.png'
            pathN = DIRN+'/img'+tot[-3:]+'-'+tot2[-5:]+'.png'
            
            #Apply
            img = cv2.imread(pathF,0)

            #resize
            img_resize = cv2.resize(img, dsize=(75,75), interpolation=cv2.INTER_CUBIC)

            #Otsu threshold
            blur = cv2.GaussianBlur(img_resize,(5,5),0)
            ret,img_thresh = cv2.threshold(blur,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)

            #dilatation
            kernel = np.ones((5,5),np.uint8)
            img_dilate = cv2.dilate(img_thresh,kernel,iterations=1)
            
            im = Image.fromarray(img_dilate)
            #Save the png files in the new directory sample
            im.save(pathN)
        
        print('Done for Sample'+tot[-3:])

#createDatabase_gray()
#createDatabase_threshold()



