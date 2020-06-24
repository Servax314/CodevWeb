
from pulp import *
from itertools import combinations
import numpy as np
import copy
import math as mt
from random import *
import pandas as pd
from itertools import permutations


InputData = "InputDataTelecomLargeInstance.xlsx"

if __name__ == "__main__":



   def extratc_data_excel(file_name, sheet_name):
      data = pd.read_excel(file_name, sheet_name=sheet_name, header=None)
      values = data.values
      if min(values.shape) == 1:  # This If is to make the code insensitive to column-wise or row-wise expression #
          if values.shape[0] == 1:
              values = values.tolist()
          else:
              values = values.transpose()
              values = values.tolist()
          return values[0]
      else:
          Ddata = {}
          if min(values.shape) == 2:  # single-dimension parameters 
              if values.shape[0] == 2:
                  for k in range(values.shape[1]):
                      Ddata[k+1] = values[1][k]
              else:
                  for k in range(values.shape[0]):
                      Ddata[k+1] = values[k][1]

          else:  # two-dimension  parameters 
              for i in range(values.shape[0]):
                  for j in range(values.shape[1]):
                      Ddata[(i+1, j+1)] = values[i][j]
          return Ddata



#Sets
customerNum = extratc_data_excel(InputData, "C")[0]
Set_C = [i for i in range(1,customerNum+1)]

endOfficeNum = extratc_data_excel(InputData, "M")[0]
Set_M = [i for i in range(1,endOfficeNum+1)]

digitalHubNum = extratc_data_excel(InputData, "N")[0]
Set_N = [i for i in range(1,digitalHubNum+1)]

alpha= extratc_data_excel(InputData, "alpha")
Hij= extratc_data_excel(InputData, "CustToTargetAllocCost(hij)")
Cjk= extratc_data_excel(InputData, "TargetToSteinerAllocCost(cjk)")
Gkm= extratc_data_excel(InputData, "SteinerToSteinerConnctCost(gkm)")
fk= extratc_data_excel(InputData, "SteinerFixedCost(fk)")
Ujmax= extratc_data_excel(InputData, "TargetCapicity(Uj)")
Vkmax= extratc_data_excel(InputData, "SteinerCapacity(Vk)")


#Xij=1 si Ai=j
#Yjk=1 si Bj=k
#Zkm=1 si Zk=m

###Variables####
def Xij(S,i,j):

    Ai=S["A"]
    if Ai[i-1]==j :
        return 1
    return 0

def Yjk(S,j,k):
    Bj=S["B"]
    if Bj[j-1]==k :
        return 1
    return 0

def Zkmf(S,k,m):
    Dk=S["D"]
    i=Dk.index(k)
    if i >0 :
        if  Dk[i-1] == m : 
            return 1
    elif Dk[-1] == m:
        return 1

    if i<len(Dk)-1:
        if Dk[i+1] == m :
            return 1
    elif Dk[0]==m :
        return 1

    return 0

def Zkm(S,k,m):
    Dk=S["D"]
    i=Dk.index(k)
    if Lk(S,k)==0 or Lk(S,m)==0 or m==k:
        return 0
    notEndCondition=True
    while notEndCondition :
        i=(i+1)%digitalHubNum
        if Lk(S,Dk[i]) ==1 :
           notEndCondition=False
    if Dk[i] == m :
        return 1
    return 0



def Lk(S,k):
    Bj=S["B"]
    if k not in Bj :
        return 0
    return 1

def Wijk(S,i,j,k):
    return Xij(S,i,j)*Yjk(S,j,k)





def calcul_Z(S):


    return sum([sum([Xij(S,i,j)*Hij[i,j] for i in Set_C]) for j in Set_M ])+ sum([sum([Yjk(S,j,k)*Cjk[j,k] for j in Set_M]) for k in Set_N ])+  
    sum(fk[k-1]*Lk(S,k) for k in Set_N) + sum([sum([Gkm[k,m]*Zkm(S,k,m) for k in Set_N]) for m in Set_N ])





def constraint_respect(S):
    if constraint1(S) and constraint2(S) and constraint3(S) and constraint4(S) and constraint5(S) and constraint6(S) and constraint7(S) and constraint8(S) and constraint9(S):
        return True
    return False


def constraint1(S) :
    for i in Set_C :
        if not sum([Xij(S,i,j) for j in Set_M]) <= 1 :
            return False
    return True


def constraint2(S):
    for j in Set_M:
        if not sum([Yjk(S,j,k) for k in Set_N]) == 1 :
            return False
    return True

def constraint3(S):
    for k in Set_N :
        for j in Set_M :
            if not Lk(S,k) >= Yjk(S,j,k) :
                return False
    return True


def constraint4(S):
    for k in Set_N :
        if not sum([Zkm(S,k,m) for m in Set_N])+sum([Zkm(S,m,k) for m in Set_N])==2*Lk(S,k):
            return False
    return True


def constraint5(S):
    #PN=list(permutations(Set_N)) cette méthode est trop longue bien que plus concise à écrire
    P=[]

    for i in range(0,2**digitalHubNum) :
        H=[]
        for j in Set_N :
            if (i//(2**(j-1) ))%2==1 :
                H+=[j]
        length=len(H)
        if length>=3 :
            if length <= sum(Lk(S,k) for k in H)-1 :
                Tout_les_H+=[H]
    for H in P :
        Set_t=[]
        for i in Set_N :
            if i not in H :
                Set_t+=[i]
        for t in Set_t :
            for l in H :
                Set_M_H_l=H[:]
                Set_M_H_l.remove(l)
                if not lpSum(sum([Zkm(S,k,m) for k in H]) for m in H)<= sum([Lk(S,j)+1 -Lk(S,t) for j in Set_j_H_l]) :
                    return False
    return True

def constraint6(S):
    for j in Set_M :
        if not Ujmax[j-1] >= sum([Xij(S,i,j) for i in Set_C]):
            return False
    return True


def constraint7(S):
    for k in Set_N:
        if not sum([sum([Wijk(S,i,j,k) for j in Set_M])for i in Set_C])<=Vkmax[k-1]:
            return False
    return True

def constraint8(S):
    if not sum([Lk(S,k) for k in Set_N])>=3 :
        return False
    return True

def constraint9(S):
    if not customerNum*alpha[0] <= sum([sum([Xij(S,i,j) for i in Set_C]) for j in Set_M ]):
        return False
    return True

def GenereVoisin_A(Sv,i):
    S=copy.deepcopy(Sv)
    A=S["A"]
    A[i//(endOfficeNum+1)]=i%(endOfficeNum+1)
    S["A"]=A
    return S





def GenereVoisin_B(Sv,i):
    S=copy.deepcopy(Sv)
    B=S["B"]
    B[i//(digitalHubNum+1)]=i%(digitalHubNum+1)
    S["B"]=B
    return S

def GenereVoisin_D(Sv,i,j):
    S=copy.deepcopy(Sv)
    D=S["D"]
    D[i],D[j]=D[j],D[i]
    S["D"]=D
    return S



def GenerateInitialSolution(Greedy_ornotGreedy) : #Greedy est un booléen on génère une solution aléatoire ou on utilise greedy
    Aiinit=[]
    Bjinit=[]
    Dkinit=[]
    for i in range(customerNum):
        Aiinit+=[randint(0,endOfficeNum)]
    for j in range(endOfficeNum):
        Bjinit+=[randint(0,digitalHubNum)]
    if not Greedy_ornotGreedy :
        Dkinit=range(1,digitalHubNum+1)[:]
        Dkinit=sample(Dkinit,len(Dkinit))
    if Greedy_ornotGreedy :
        Dkinit+=[1]
        current_vertex=Dk0[0]
        for i in range(1,digitalHubNum):
            l=[Gkm[current_vertex,m] for m in Set_N]
            l2=l[:]
            for i in Dkinit :
                l.remove(l2[i-1])
            current_vertex=l2.index(min(l))+1
            Dkinit+=[current_vertex]
    Sinit={"A": Aiinit, "B": Bjinit, "D":Dkinit}
    if not constraint_respect(Sinit):
        Sinit=GenerateInitialSolution(Greedy_ornotGreedy)
    return Sinit

def searchNeighbor(Sactuel,var):
    visible=True
    Z_min=calcul_Z(Sactuel)
    notBest=True
    i=0
    if var=="A":
        while i in range(customerNum*(endOfficeNum+1)) and notBest :
            Voisin_S=GenereVoisin_A(Sactuel,i)
            Z_Voisin_S=calcul_Z(Voisin_S)
            if Z_Voisin_S<Z_min and constraint_respect(Voisin_S):
                if visible :
                    print(Z_Voisin_S)
                notBest=False
                Sactuel=copy.deepcopy(Voisin_S)
                return Sactuel,notBest
            i+=1



    if var=="B":
        while i in range(endOfficeNum*(digitalHubNum+1)) and notBest :
            Voisin_S=GenereVoisin_B(Sactuel,i)
            Z_Voisin_S=calcul_Z(Voisin_S)
            if Z_Voisin_S<Z_min and constraint_respect(Voisin_S):
                if visible :
                    print(Z_Voisin_S)
                notBest=False
                Sactuel=copy.deepcopy(Voisin_S)
                return Sactuel,notBest
            i+=1
    if var =="D":
        while i in range(digitalHubNum) and notBest :
            j=i+1
            while j in range(digitalHubNum) and notBest :
                Voisin_S=GenereVoisin_D(Sactuel,i,j)
                Z_Voisin_S=calcul_Z(Voisin_S)
                if Z_Voisin_S<Z_min and constraint_respect(Voisin_S):
                    if visible :
                        print(Z_Voisin_S)
                    notBest=False
                    Sactuel=copy.deepcopy(Voisin_S)
                    return Sactuel,notBest
                j+=1
            i+=1
    return Sactuel,notBest

def LocalSearch(S,ordre):
    stillNeighbors=True
    Sactuel=copy.deepcopy(S)
    notBest=True
    while stillNeighbors :
        Sactuel,notBest=searchNeighbor(Sactuel,ordre[0])
        if notBest :
            Sactuel,notBest=searchNeighbor(Sactuel,ordre[1])
            if notBest :
                Sactuel,notBest=searchNeighbor(Sactuel,ordre[2])
                if notBest :
                    stillNeighbors=False
    print("Résultat de la localSearch :" ,Sactuel)
    return Sactuel
    
def Perturbation(S_etoile,history,methode): #en fonction de la méthode la perturbation sera faite différemment,
    global globalrecursif
    S={}
    if methode==1:
        i=randint(0,customerNum*(endOfficeNum+1)-1)
        A=GenereVoisin_A(S_etoile,i)["A"]
        i=randint(0,endOfficeNum*(digitalHubNum+1)-1)
        B=GenereVoisin_B(S_etoile,i)["B"]
        i=randint(0,digitalHubNum-1)
        j=randint(i,digitalHubNum-1)
        D=GenereVoisin_D(S_etoile,i,j)["D"]
        S= {"A":A,"B":B,"D":D}
    else :
        S=GenerateInitialSolution(False)
    if not constraint_respect(S) and globalrecursif<100 :
        globalrecursif+=1
        S=Perturbation(S,history,methode)
    if globalrecursif >=100 :
        globalrecursif =0
        return S_etoile
    globalrecursif =0
    return S

def AcceptanceCriterion(S_etoile,S_i_etoile,methode):
    Z_S_etoile=calcul_Z(S_etoile)
    Z_S_i_etoile=calcul_Z(S_i_etoile)
    if methode=="instable":#On prend le plus minimimum local le plus grand
        if Z_S_etoile>Z_S_i_etoile:
            return Z_S_etoile,S_etoile
        else :
            return Z_S_i_etoile,S_i_etoile
    if methode=="stable":#On prend le plus minimimum local le plus petit
        if not Z_S_etoile>Z_S_i_etoile:
            return Z_S_etoile,S_etoile
        else :
            return Z_S_i_etoile,S_i_etoile
    return Z_mini,S_i_etoile

###Main###
A=[5,8,4,2,8,5,4,4,1,3,2,2,5,0,1]
B=[1,3,3,3,4,4,3,1]
D=[6,5,1,2,3,4]
S0={"A": A, "B": B,"D":D}
globalrecursif=1
n=50
history={}
ordre=["B","D","A"]
S0=GenerateInitialSolution(True)
S_etoile=LocalSearch(S0,ordre)
history[1]=[S_etoile,calcul_Z(S_etoile)]
for i in range(n) :
    S_i = Perturbation(S_etoile,history,1)
    S_i_etoile=LocalSearch(S_i,ordre)
    history[i+2]=[S_i_etoile,calcul_Z(S_i_etoile)]
    Z_mini,S_etoile=AcceptanceCriterion(S_etoile,S_i_etoile,"stable")
print(history)
objective=[history[i][1] for i in range(1,len(history))]
print("Z_mini = ",min(objective))
print("S_min : ",history[objective.index(min(objective))+1][0])
