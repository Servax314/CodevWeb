import captcha
import captcha.image
from captcha.image import ImageCaptcha

imcaptcha = ImageCaptcha()

text = 'PaulFdp'

img = imcaptcha.generate_image(text)

#Add noise
#imcaptcha.create_noise_curve(img,img.getcolors())

#Save Image
img.save('img.png')
