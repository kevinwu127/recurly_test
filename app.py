from flask import Flask 
from flask import request
from flask import redirect
from flask import render_template
import recurly

import uuid

recurly.SUBDOMAIN = 'supportpay-test'
recurly.API_KEY = 'ca823827fc984c7c8da27fab690154e0'

app = Flask(__name__)

@app.route("/")
def index():
	return render_template('index.html', success=False)

@app.route("/subscriptions/new", methods=['POST'])
def new_subscription():

	try:
		subscription = recurly.Subscription(
			plan_code = 'basic',
			currency = 'USD',
			account = recurly.Account(
				account_code = uuid.uuid1(),
				billing_info = recurly.BillingInfo(
					token_id = request.form['recurly-token']
				)
			)
		)

		subscription.save()
		return render_template('index.html', success=True)

	except recurly.ValidationError, errors:
		return ', '.join(e.message for e in errors)

if __name__ == "__main__":
	app.run('127.0.0.1', 9001)