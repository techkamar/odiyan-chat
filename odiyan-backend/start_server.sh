#Activate ENVIRONMENT
source venv/bin/activate

#export STATIC_CACHING_ENABLED="N" # Always read from file

# Install dependencies
pip install -r requirements.txt

# Start server with Uvicorn
uvicorn main:app --port 8080 --reload