#Activate ENVIRONMENT
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server with Uvicorn
uvicorn main:app --port 8080 --reload