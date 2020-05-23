import pymongo
from pymongo import MongoClient

client = MongoClient("mongodb+srv://nicolasservot:<password>@clustercodev-vuw7l.mongodb.net/test?retryWrites=true&w=majority")
db = client.get_database('test')
uploads_chunks = db.uploads_chunks
download = db.download

#Count the number of document in uploads_chunks
number_docs = uploads_chunks.count_documents({})


#Create new document
post = {
	'body': ''
	'percentage": ''
	'user':  ''
}


download.insert_one(post)

