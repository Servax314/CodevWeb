import sys
import argparseimport cv2
import editdistance
from DataLoader import DataLoader, Batch, Sample
from CustomModel import CustomModel
from SamplePreprocessor import preprocess

def train(model, loader):
    epoch = 0
    bestCharErrorRate = float('inf')
    noImprovementSince = 0
    earlyStopping = 5
    while True:
        epoch += 1
        print('Epoch : ', epoch)

        #train step
        print('Training Neural Network')
        loader.trainSet()
        while loader.hasNext():
            iterInfo = loader.getIteratorInfo()
            batch = loader.getNext()
            loss = model.trainBatch(batch)
            print('Batch : ',iterInfo[0],' | ', iterInfo[1], 'Loss : ',loss)

        #validationStep
        charErrorRate = validate(model, loader)

        #if charErrorRate < bestErrorChar, save the model
        if charErrorRate < bestCharErrorRate:
            print(Error rate improved, save model ...)
            bestCharErrorRate = charErrorRate
            noImprovementSince = 0
            model.save()
        else:
            print('Error rate not improved')
        
        #Apply condition to stop the training
        if noImprovementSince >= earlyStopping:
            print("no more improvement %d epochs. Training stopped" % earlyStopping)
            


def validationStep(model, loader):