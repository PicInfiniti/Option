
import requests, json, time

from pymongo import MongoClient

taxes = 1.012512

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


def number(a):
  a = a.replace(',', '').replace('.', '').replace(' M', '00000').replace(' B', '00000000')
  return int(a)


def Simplify(Data):
  for i in Data:
    i['val'] = {
      j['t']: j['v']
      for j in i['val']
    }
    i['val']['ekh'] = number(i['val']['gh_s_p']) - number(i['val']['ghe'])
    i['val']['percent'] = round(i['val']['ekh'] / number(i['val']['gh_s_p'])*100, 2)
    i['val']['ghe+ba_gh'] = round(number(i['val']['ghe'])*taxes) + number(i['val']['ba_gh'])
    i['val']['ekh_profit'] = number(i['val']['gh_s_p']) - i['val']['ghe+ba_gh']
    i['val']['p_profit'] = round(i['val']['ekh_profit'] / number(i['val']['gh_s_p'])*100, 2)
    i['val']['leverage'] = round(number(i['val']['gh_s_p'])/number(i['val']['ba_gh']), 2) if number(i['val']['ba_gh'])  else 0
    
    i['val']['ekh'] = '{:,}'.format(i['val']['ekh'])
    i['val']['percent'] = '{:,}'.format(i['val']['percent'])
    i['val']['ghe+ba_gh'] = '{:,}'.format(i['val']['ghe+ba_gh'])
    i['val']['ekh_profit'] = '{:,}'.format(i['val']['ekh_profit'])
    i['val']['p_profit'] = '{:,}'.format(i['val']['p_profit'])
    i['val']['leverage'] = '{:,}'.format(i['val']['leverage'])

  
if __name__=='__main__':
  res = requests.get('https://tse.ir/json/MarketWatch/data_7.json',verify = False).content
  res = json.loads(res)
  res.update({
    '_id': int2base(time.time(), 32)
  })
  Simplify(res['bData'])
  
  
  OPTION.delete_many({})
  OPTION.insert_one(res)
