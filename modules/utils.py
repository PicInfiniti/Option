
import requests, json, time

from pymongo import MongoClient


def int2base(x, base):
  digs = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  x = int(x)
  
  if x < 0:
      sign = -1
  elif x == 0:
      return digs[0]
  else:
      sign = 1

  x *= sign
  digits = []

  while x:
      digits.append(digs[x % base])
      x = x // base

  if sign < 0:
      digits.append('-')

  digits.reverse()

  return ''.join(digits)




tsetmc = MongoClient("mongodb://localhost/")["tsetmc"]
OPTION = tsetmc.option



def Simplify(Data):
  for i in Data:
    i['val'] = {
      j['t']: j['v']
      for j in i['val']
    }
    i['val']['ekh'] = int(i['val']['gh_s_p'].replace(',',''))-int(i['val']['ghe'].replace(',',''))
    i['val']['percent'] = round(i['val']['ekh'] / int(i['val']['gh_s_p'].replace(',',''))*100, 2)
    
    i['val']['percent'] = '{:,}'.format(i['val']['percent'])
    i['val']['ekh'] = '{:,}'.format(i['val']['ekh'])

    

  
if __name__=='__main__':
  res = requests.get('https://tse.ir/json/MarketWatch/data_7.json',verify = False).content
  res = json.loads(res)
  res.update({
    '_id': int2base(time.time(), 32)
  })
  Simplify(res['bData'])
  
  
  OPTION.delete_many({})
  OPTION.insert_one(res)


