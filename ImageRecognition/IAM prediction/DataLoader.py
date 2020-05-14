#Code: https://github.com/githubharald/SimpleHTR

import numpy as np
import cv2
import random
import matplotlib.pyplot as plt
import PIL
from PIL import Image
import tensorflow as tf
import sklearn
from sklearn.preprocessing import StandardScaler
from SamplePreprocessing import preprocess
import os

###### COMMENTARY ######

'''
Sample.gtText -> Text associated to the sample
Sample.filePath -> filepath to the image

Batch.imgs -> array of the images contained in the batch
Batch.gtTexts -> Text associated to the sample

DataLoader.filePath -> filepath were the data are saved
DataLoader.batchSize -> batch size of the DataLoader
DataLoader.imgsize -> size of the image saved in the DataLoader
DataLoader.maxTextLen -> max text length
Dataloader.dataAugmentation ->
DataLoader.samples -> current samples saved in the Dataloader (list of tuple, array of img and text)
DataLoader.trainSamples -> array of the train sample
DataLoader.validationSamples -> array of the validation sample
DataLoader.trainWords -> array of the training words
DataLoader.validationWords -> array of the validation words
DataLoader.numTrainSamplesPerEpoch -> num train samples per epoch
'''




class Sample:
	"sample from the dataset"
	def __init__(self, text, filePath):
		self.text = text
		self.filePath = filePath


class Batch:
	"batch containing images and ground truth texts"
	def __init__(self, texts, imgs):
		self.imgs = np.stack(imgs, axis=0)
		self.texts = texts


class DataLoader: 

	def __init__(self, filePath, batchSize, imgSize, maxTextLen):
		"loader for dataset at given location, preprocess images and text according to parameters"

		assert filePath[-1]=='/'

		self.dataAugmentation = False
		self.currIdx = 0
		self.batchSize = batchSize
		self.imgSize = imgSize
		self.samples = []
		self.filepath = filePath

		training_test=open(filePath+'training_test.txt')
		validation_test = open(filePath+'validation_test.txt')
		training_chars = set()
		validation_chars = set()
		badSamples = []

		
		for line in training_test:
			# ignore the empty line or the commented line
			if not line or line[0]=='#':
				continue

			lineSplit = line.strip().split(' ')
			fileName = filePath+'training_test'+lineSplit[0]

			#text are words
			text = self.truncateLabel(lineSplit[1], maxTextLen)
			training_chars = training_chars.union(set(list(text)))

			# check if image is not empty
			if not os.path.getsize(fileName):
				badSamples.append(fileName)
				continue

			# put sample into list
			self.trainSamples.append(Sample(text, fileName))
			self.trainWords = [x.text for x in self.trainSamples]
		
		for line in validation_test:
			#ignore the empty line or the commented line
			if not line or line[0]=='#':
				continue
				
			lineSplit = line.strip().split(' ')
			fileName = filePath+'validation_test'+lineSplit[0]

			#text are words
			text = self.truncateLabel(lineSplit[1],maxTextLen)
			validation_chars = validation_chars.union(set(list(text)))

			#check if image is not empty
			if not os.path.getsize(fileName):
				badSamples.append(fileName)
				continue

			self.validationSamples.append(Sample(text, fileName))
			self.validationWords = [x.text for x in self.validationSamples]
		
		if badSamples!=[]:
			print("Warning, damaged images found : ", badSamples)
		




		
	def truncateLabel(self, text, maxTextLen):
		cost = 0
		for i in range(len(text)):
			if i!=0 and text[i] == text[i-1]:
				cost+=2
			else:
				cost+=1
			if cost > maxTextLen[:i]
		return text