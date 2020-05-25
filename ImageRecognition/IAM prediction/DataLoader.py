#Code: https://github.com/githubharald/SimpleHTR

from __future__ import division
from __future__ import print_function

import os
import random
import numpy as np
import cv2
from SamplePreprocessor import preprocess

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
	def __init__(self, gtText, filePath):
		self.gtText = gtText
		self.filePath = filePath


class Batch:
	"batch containing images and ground truth texts"
	def __init__(self, gtTexts, imgs):
		self.imgs = np.stack(imgs, axis=0)
		self.gtTexts = gtTexts



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
		self.numTrainSamplesPerEpoch = 20000

		training_set=open(filePath+'training_set.txt',encoding='utf-8-sig')
		validation_set = open(filePath+'validation_set.txt',encoding='utf-8-sig')
		
		training_chars = set()
		validation_chars = set()
		badSamples = []

		self.trainSamples = []
		self.validationSamples = []
		
		for line in training_set:
			# ignore the empty line or the commented line
			if not line or line[0]=='#':
				continue

			lineSplit = line.strip().split(' ')
			fileName = filePath+'training_set/'+lineSplit[0]

			#text are words
			gtText = self.truncateLabel(lineSplit[1], maxTextLen)
			training_chars = training_chars.union(set(list(gtText)))

			# check if image is not empty
			if not os.path.getsize(fileName):
				badSamples.append(fileName)
				continue

			# put sample into list
			self.trainSamples.append(Sample(gtText, fileName))
			self.trainWords = [x.gtText for x in self.trainSamples]

		print("Load complete : train_set")
		
		for line in validation_set:
			#ignore the empty line or the commented line
			if not line or line[0]=='#':
				continue
				
			lineSplit = line.strip().split(' ')
			fileName = filePath+'validation_set/'+lineSplit[0]

			#text are words
			gtText = self.truncateLabel(lineSplit[1],maxTextLen)
			validation_chars = validation_chars.union(set(list(gtText)))

			#check if image is not empty
			if not os.path.getsize(fileName):
				badSamples.append(fileName)
				continue
			
			self.validationSamples.append(Sample(gtText, fileName))
			self.validationWords = [x.gtText for x in self.validationSamples]
			
		print("Load complete : validation_set")

		self.trainSet()
		self.charList = sorted(list(training_chars.union(validation_chars)))
		print("Loading complete")
	
	def trainSet(self):
		"switchto randomly chosen subset of training set"
		self.dataAugmentation = True
		self.currIdx = 0
		random.shuffle(self.trainSamples)
		self.samples = self.trainSamples[:self.numTrainSamplesPerEpoch]
	
	def validationSet(self):
		"switch to validation set"
		self.dataAugmentation = False
		self.currIdx = 0
		self.samples = self.validationSamples

	def truncateLabel(self, text, maxTextLen):
		cost = 0
		for i in range(len(text)):
			if i!=0 and text[i] == text[i-1]:
				cost+=2
			else:
				cost+=1
			if cost > maxTextLen:
				return text[:i]
		return text
	
	def switchToTrainSet(self):
		self.dataAugmentation = True
		self.currIdx = 0
		random.shuffle(self.trainSamples)
		self.samples = self.trainSamples[:self.numTrainSamplesPerEpoch]
	
	def switchToValidationSet(self):
		self.dataAugmentation = False
		self.currIdx = 0
		self.samples = self.validationSamples

	def getNext(self):
		batchRange = range(self.currIdx, self.currIdx + self.batchSize)
		gtTexts = [self.samples[i].gtText for i in batchRange]
		imgs = [preprocess(cv2.imread(self.samples[i].filePath, cv2.IMREAD_GRAYSCALE), self.imgSize, self.dataAugmentation) for i in batchRange]
		self.currIdx += self.batchSize
		return Batch(gtTexts, imgs)

	def getIteratorInfo(self):
		return (self.currIdx // self.batchSize + 1, len(self.samples) // self.batchSize)

	def hasNext(self):
		return self.currIdx + self.batchSize <=len(self.samples)