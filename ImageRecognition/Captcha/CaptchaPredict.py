import pytesseract
import PIL
from PIL import Image
from subprocess import check_output

path = 'img.png'

print("Resampling the Image")
check_output(['convert','img.png','-resample','600','img.png'])
text = pytesseract.image_to_string(Image.open(path))

print(text)
