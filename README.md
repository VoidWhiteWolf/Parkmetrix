# Parkmetrix Render Deployment

## Files included
- Flask app entrypoint: `app.py`
- Templates: `templates/`
- Static files: `static/`
- Render config: `render.yaml`

## Deploy on Render
1. Upload this folder to a GitHub repository.
2. In Render, create a new Web Service from that repo.
3. Render should detect `render.yaml`.
4. If it asks manually, use:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
5. Optional: add environment variable `RAZORPAY_KEY_ID` with your real Razorpay key.

## Notes
- `/order` and `/verify` are placeholders right now.
- Login/register still uses SheetDB directly from the frontend.
- Replace demo payment logic before production use.
