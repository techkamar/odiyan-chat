# Refresh Repo
sudo apt update -y

# Install Python venv
sudo apt install python3-venv

# Create new python environment
python3 -m venv venv

#Activate ENVIRONMENT
source venv/bin/activate

# Install PIP packages
torsocks pip install -r requirements.txt

# Start server with Uvicorn
uvicorn main:app --port 8000 --reload
