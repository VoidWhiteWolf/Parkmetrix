import os
from flask import Flask, jsonify, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/")
def home():
    key_id = os.getenv("RAZORPAY_KEY_ID", "rzp_test_demo")
    return render_template("index.html", key_id=key_id)

@app.route("/signin")
def signin():
    return render_template("signin.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/order", methods=["POST"])
def order():
    return jsonify({"amount": 5000, "order_id": "demo_order_12345"})

@app.route("/verify", methods=["POST"])
def verify():
    return "Payment verification placeholder. Connect Razorpay signature verification here.", 200

@app.route("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
