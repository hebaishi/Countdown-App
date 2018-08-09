from flask import Flask, jsonify, request
import datetime, time
import pickle
import os

app = Flask(__name__)

filename = 'last_time.pkl'

LABEL_KEY = 'label'
TIMESTAMP_KEY = 'timestamp'

def read_data():
  if not os.path.isfile(filename) or os.stat(filename).st_size == 0:
    write_data({
      LABEL_KEY: '',
      TIMESTAMP_KEY: 0.0
    })
  input_file = open(filename, 'rb')
  return pickle.loads(input_file.read())

def write_data(obj):
  output_file = open(filename, 'wb')
  output_file.write(pickle.dumps(obj))
  output_file.close()

@app.route('/api/elapsed_time')
def get_elapsed_time():
  data = read_data()
  ts = datetime.datetime.fromtimestamp(data[TIMESTAMP_KEY])
  now = datetime.datetime.now()
  td = now - ts
  label = '' if not LABEL_KEY in data else data[LABEL_KEY]
  return jsonify(
    {
      'days': td.days,
      'seconds': td.seconds,
      'label': label
    }
  )

@app.route('/api/reset_time', methods=['POST'])
def set_time():
  data = read_data()
  now = datetime.datetime.now()
  s = time.mktime(now.timetuple())
  data[TIMESTAMP_KEY] = s
  write_data(data)
  return jsonify({ 'status': 'ok' })

@app.route('/api/label', methods=['POST'])
def set_label():
  try:
    data = read_data()
    data[LABEL_KEY] = request.get_json()[LABEL_KEY]
    write_data(data)
    return jsonify({ 'status': 'ok' })
  except Exception as e:
    return jsonify({ 'status': str(e) })
