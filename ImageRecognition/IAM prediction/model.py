import numpy as np
import cv2
import random
import matplotlib.pyplot as plt
import sklearn
import tensorflow as tf
import os
import sys

#define custom model

class CustomModel(tf.keras.Model):
	
	def __init__(self):
		super(CustomModel, self).__init__()
		
		#Insert Convolution Layers

		features_values = [32,64,128,128,256]
		Filter_size = [5,5,3,3,3]
		poolsize = [(2,2),(2,2),(1,2),(1,2),(1,2)]

		#By default, strides values are fixed to 1

		self.convolution1 = tf.keras.layers.Conv2D(features_values[0],Filter_size[0], activation = 'relu', name = 'convolution1')
		self.pooling1 = tf.keras.layers.MaxPooling2D(poolsize[0],strides=None,padding='valid',data_format=channel_lasts)
		
		self.convolution2 = tf.keras.layers.Conv2D(features_values[1],Filter_size[1], activation = 'relu', name = 'convolution2')
		self.pooling2 = tf.keras.layers.MaxPooling2D(poolsize[1],strides=None,padding='valid',data_format=channel_lasts)
		
		self.convolution3 = tf.keras.layers.Conv2D(features_values[2],Filter_size[2], activation = 'relu', name = 'convolution3')
		self.pooling2 = tf.keras.layers.MaxPooling2D(poolsize[2],strides=None,padding='valid',data_format=channel_lasts)
		
		self.convolution4 = tf.keras.layers.Conv2D(features_values[3],Filter_size[3], activation = 'relu', name = 'convolution4')
		self.pooling2 = tf.keras.layers.MaxPooling2D(poolsize[3],strides=None,padding='valid',data_format=channel_lasts)
		
		self.convolution5 = tf.keras.layers.Conv2D(features_values[4],Filter_size[4], activation = 'relu', name = 'convolution5')
		self.pooling2 = tf.keras.layers.MaxPooling2D(poolsize[4],strides=None,padding='valid',data_format=channel_lasts)
		
		#Insert LSTM Layers (RNN Layers)

		self.rnn_layer1 = tf.keras.layers.LSTM(_,return_sequences = True, stateful = True, name = 'rnn_layer1')
		self.rnn_layer2 = tf.keras.layers.LSTM(_,return_sequences = True, stateful = True, name = 'rnn_layer2')

		def call(self,_)
