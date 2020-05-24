import pymongo
from pymongo import MongoClient
import gridfs
import numpy as np
import matplotlib.pyplot as plt
from gridfs import GridFSBucket

client = MongoClient("mongodb+srv://nicolasservot:nicolasservot@clustercodev-vuw7l.mongodb.net/test?retryWrites=true&w=majority")
db = client['test']

#upload = gridfs.GridFS(db,collection='uploads')
uploads = GridFSBucket(db,bucket_name='uploads')
fileName = "49efa22b204232ad9c1c338d44d04ac5.jpg"

output = uploads.open_download_stream_by_name(fileName)
content = output.read()
print(content)


#txt = open('data','wb')
#uploads.download_to_stream_by_name(fileName, txt)
#txt.close

#file = upload.find_one({"filename":fileName})


#Count the number of document in uploads_chunks
#number_docs = upload.count_documents({})
#print(number_docs)


