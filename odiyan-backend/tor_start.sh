#Activate ENVIRONMENT
source venv/bin/activate

# Start server with Uvicorn
uvicorn main:app --port 8000 --reload
