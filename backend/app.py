from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask import request
from  utils import res 
 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:jzh12@localhost/db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
 
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    gender = db.Column(db.String(10), unique=False, nullable=False)
    create_at = db.Column(db.DateTime, unique=False, nullable=False, default=datetime.utcnow)
    update_at = db.Column(db.DateTime, unique=False, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return '<User %r>' % self.name

    def dictRepr(self):
            info ={
                "id": self.id,
                "name": self.name,
                "gender":self.gender,
                "create_at":self.create_at,
                "update_at": self.update_at
            }
            return info 

 
def model_to_dict(model):
    return {col: value for col, value in vars(model).items()}

@app.route("/info", methods=["GET"])
def info():
    id = request.args.get("id")
    user = User.query.filter(User.id == id).first()
    return res(user, "ok", 0)


@app.route("/api/list", methods=['GET'])
def list():
    page = request.args.get('page', 1, type = int)
    size = request.args.get('size', 10, type = int)
    print(size)
    pagination = User.query.order_by(User.update_at.desc()).paginate(page= page, per_page=size)
    print(pagination)
    user_dict_list = [user.dictRepr() for user in pagination.items]
    total = pagination.total
    return res({"list":user_dict_list, "total": total}, "ok", 0)


@app.route("/api/add", methods=["POST", "GET"])
def add():
    data = request.get_json()
    name = data.get("name")
    gender = data.get("gender")
    if request.method == "POST":
        new_user = User(name=name,gender= gender )
        try:
            db.session.add(new_user)
            db.session.commit()
            return res(None, "ok", 0)
        except Exception as e:
            print(e)
            return res(None, e, 1)
    else:
        new_user = User(name=name,gender= gender)
        try:
            db.session.add(new_user)
            db.session.commit()
            return res(None, "ok", 0)
        except:
            return res(None, "err", 1)


@app.route("/api/update/<int:id>", methods=["PUT"])
def update(id):
    user = User.query.get_or_404(id)
    data = request.get_json()

    if request.method == "PUT":
        user.name = data.get("name")
        user.gender = data.get("gender")
        try:
            db.session.commit()
            return res(None, "ok", 0)
        except:
            return res(None, "ok", 1)
    else:
        return res(None, "Not Support GET", 2)



if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0', port=5001)