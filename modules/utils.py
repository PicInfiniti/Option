
import requests, json, time, logging

from pymongo import MongoClient

# setup logger ++++++++++++++++++++++++++++++++++++++++++++++++
logger = logging.getLogger('main')
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(levelname)s :: %(asctime)s ::%(lineno)d :: %(name)s :: %(message)s')
file_Handler = logging.FileHandler('./logger.log')
file_Handler.setFormatter(formatter)
logger.addHandler(file_Handler)
# --------------------------------------------------------------

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

def number(a):
  if type(a)==int:
     return a
  elif type(a)==str:
    a = a.replace(',', '').replace('.', '').replace(' M', '00000').replace(' B', '00000000')
    return int(a)
  else:
    return 0



def Simplify(Data):
  DATA = []
  for i in Data:
    tmp = {
        #buy option
        "instrumentId": i['instrumentId'],
        "instrumentName": i['instrumentName'],
        "companyNamePersian": i['companyNamePersian'],
        "closingPrice": number(i["closingPrice"]["value"]),
        "moqeyateBaz": number(i["moqeyateBaz"]["value"]),
        "tradeVolume": number(i["tradeVolume"]["value"]),
        "tradeValue": number(i["tradeValue"]["value"]),
        "lastPrice": number(i["lastPrice"]["value"]),
        "buyQuantity" : number(i["buyQuantity"]["value"]),
        "buyBuyPrice": number(i["buyBuyPrice"]["value"]),
        "sellBuyPrice": number(i["sellBuyPrice"]["value"]),
        "sellBuyQuantity": number(i["sellBuyQuantity"]["value"]),

        #common
        "andazeQarardad": number(i["andazeQarardad"]["value"]),
        "baghimandeTaSarresid": number(i["baghimandeTaSarresid"]["value"]),
        "qeymateEmal": number(i["qeymateEmal"]["value"]),
        "qeymateMabna": number(i["qeymateMabna"]["value"]),

        #sell option
        "sellInstrumentId": i["sellInstrumentId"],
        "sellInstrumentName": i['sellInstrumentName'],
        "sellCompanyNamePersian": i['companyNamePersian'],
        "sellClosingPrice": number(i["sellClosingPrice"]["value"]),
        "sellMoqeyathayeBaz": number(i["sellMoqeyathayeBaz"]["value"]),
        "sellTradeVolume": number(i["sellTradeVolume"]["value"]),
        "sellTradeValue": number(i["sellTradeValue"]["value"]),
        "sellLastPrice": number(i["sellLastPrice"]["value"]),
        "buyQuantity" : number(i["buyQuantity"]["value"]),
        "buyBuyPrice": number(i["buyBuyPrice"]["value"]),
        "sellSellPrice": number(i["sellSellPrice"]["value"]),
        "sellSellQuantity": number(i["sellSellQuantity"]["value"]),
    }
    


    tmp['ekh'] = tmp['qeymateMabna'] - tmp['qeymateEmal']
    tmp['percent'] = round((tmp['ekh'] / tmp['qeymateMabna'])*100, 2)
    tmp['ghe+sellBuyPrice'] = round(tmp['qeymateEmal']*taxes + tmp['sellBuyPrice'], 2)
    tmp['ekh_profit'] = round(tmp['qeymateMabna'] - tmp['ghe+sellBuyPrice'], 2)
    tmp['p_profit'] = round((tmp['ekh_profit'] / tmp['qeymateMabna'])*100, 2)
    tmp['leverage'] = round(tmp['qeymateMabna']/tmp['sellBuyPrice'], 2) if tmp['sellBuyPrice'] else 0
    
    # tmp['ekh'] = '{:,}'.format(tmp['ekh'])
    # tmp['percent'] = '{:,}'.format(tmp['percent'])
    # tmp['ghe+sellBuyPrice'] = '{:,}'.format(tmp['ghe+sellBuyPrice'])
    # tmp['ekh_profit'] = '{:,}'.format(tmp['ekh_profit'])
    # tmp['p_profit'] = '{:,}'.format(tmp['p_profit'])
    # tmp['leverage'] = '{:,}'.format(tmp['leverage'])

    DATA.append(tmp)

  return DATA
  
if __name__=='__main__':
  logger.debug("Connect to Mongo...")
  tsetmc = MongoClient("mongodb://localhost/")["tsetmc"]
  OPTION = tsetmc.option

  # res = requests.get('https://tse.ir/json/MarketWatch/data_7.json',verify = False).content
  res = requests.get('https://webgw.tse.ir/InstrumentProvider/api/v1/MarketWatch/MarketWatchAll/fa?MarketTypes=tradeOption',verify = False).json()

  # res = json.loads(res)
  res.update({
    '_id': int2base(time.time(), 32)
  })
  Simplify(res['marketWatchAllItems'])
  
  #write in Mongo
  # OPTION.delete_many({})
  # OPTION.insert_one(res)

  #write in file
  with open("src/data.json", "w") as outfile:
    json.dump(Simplify(res['marketWatchAllItems']), outfile, indent=2, ensure_ascii=False)
