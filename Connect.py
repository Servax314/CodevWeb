import pymongo
from pymongo import MongoClient
import gridfs
import numpy as np
import matplotlib.pyplot as plt

client = MongoClient("mongodb+srv://nicolasservot:nicolasservot@clustercodev-vuw7l.mongodb.net/test?retryWrites=true&w=majority")
db = client['test']

upload = gridfs.GridFS(db,collection='uploads')
l = upload.list()
print(l)
upload.find()
fileName = l[1]
file = upload.find_one({"filename":fileName})
img = file.read()

print(img)
#plt.imshow(img)
#plt.show()

#Count the number of document in uploads_chunks
#number_docs = upload.count_documents({})
#print(number_docs)


