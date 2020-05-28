import pytesseract
from pytesseract import Output
import cv2

pathImg = 'eval2011-0.png'
img = cv2.imread(pathImg)
copy = img.copy()

#With pytesseract
d=pytesseract.image_to_data(img, output_type = Output.DICT)
n_boxes = len(d['level'])

img_number = 0
for i in range(n_boxes):
    (x, y, w, h) = (d['left'][i], d['top'][i], d['width'][i], d['height'][i])
    word = img[y:y+h, x:x+w]
    cv2.rectangle(copy,(x,y),(x+w,y+h), (0,255,0),2)
    cv2.imwrite('box/imgbox_{}.png'.format(img_number),word)
    img_number+=1
    print('image'+str(img_number)+' : '+'saved')

cv2.imwrite('box/copy.png',copy)
print('All images saved')




#Without pytesseract
#useless, one boundinbox finded


#gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#thresh = cv2.threshold(gray,0,255,cv2.THRESH_OTSU + cv2.THRESH_BINARY)[1]

#cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#if len(cnts)==2:
#    cnts = cnts[0]
#else:
#    cnts = cnts[1]

#img_number = 0
#for c in cnts:
#    x,y,w,h = cv2.boundingRect(c)
#    word = img[y:y+h, x:x+w]
#    cv2.imwrite('box/imgbox_{}.png'.format(img_number),word)
#    cv2.rectangle(copy,(x,y),(x+w,y+h), (36,255,12),2)
#    img_number+=1

#cv2.imshow('thresh', thresh)
#cv2.imshow('copy', copy)
#cv2.waitKey()