# Refresh Repo
echo "⏳ Refreshing debian repos"
sudo apt update -y

# Install Python venv
echo "⏳ Installing Python3 VENV module"
sudo apt install python3-venv -y

# Create new python environment
echo "⏳ Creating new Python3 environment"
python3 -m venv venv

#Activate ENVIRONMENT
echo "⏳ Activating Python3 environment"
source venv/bin/activate

# Install PIP packages
echo "⏳ Installing PIP packages"
torsocks pip install -r requirements.txt

# Start server with Uvicorn
echo "⏳ Starting UVICORN server"
uvicorn main:app --port 8000 --reload
