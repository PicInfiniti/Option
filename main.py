from flask import Flask, render_template, request
from flask_cors import CORS
import requests




# local modules --------------------------------------


# setup server -----------------------------------------------------------------------
server = Flask(__name__, static_url_path='/assets', static_folder='assets') # change static to assets
cors = CORS(server)

# welcome root -----------------------------------------------------------------------
@server.route('/' ,methods=['GET'])
def home():
  return 'Welcome'

@server.route('/option' ,methods=['GET'])
def option():
  return requests.get('https://tse.ir/json/MarketWatch/data_7.json',verify = False).content
if __name__ == '__main__':
  server.run(host= '0.0.0.0',use_reloader=False, port=5000, debug = True, threaded = True)
