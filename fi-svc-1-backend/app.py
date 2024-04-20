from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///transactions.db'  # SQLite database URI
db = SQLAlchemy(app)

#Enable CORS for the eritre applications
CORS(app, resources={r"/*": {"origins": "*"}})

# Define Transaction model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)    
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))

# Route to accept transaction data via POST request
@app.route('/transactions', methods=['POST'])
def add_transaction():
    data = request.json

    # Print received data for debugging

    new_transaction = Transaction(
        date=data['date'],
        amount=data['amount'],
        category=data['category'],
        description=data.get('description', '')
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify(message='Transaction added successfully'), 201

# Route to retrieve all transactions
@app.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    transaction_list = []
    for transaction in transactions:
        transaction_list.append({
            'id': transaction.id,
            'date': transaction.date,
            'amount': transaction.amount,
            'category': transaction.category,
            'description': transaction.description
        })
    return jsonify(transactions=transaction_list)




# Create all database tables within the application context
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)