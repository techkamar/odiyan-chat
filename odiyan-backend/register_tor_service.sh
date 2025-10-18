#
#   Run this file only after changing to root user by running command given below 
#   
#   $ sudo su
#

# Move to right folder
echo "⏳ Moving to /etc/tor directory"
cd /etc/tor

# Add Hidden Service
echo "⏳ Adding Hidden Service Configuration in torrc file"
echo "HiddenServiceDir /var/lib/tor/hidden_service/" >> torrc
echo "HiddenServicePort 80 127.0.0.1:8000" >> torrc

# Restart TOR service
echo "⏳ Restarting TOR Service"
systemctl restart tor

# Sleep for 3 seconds and display the .onion domain name
echo "⏳ Fetching .onion domain name"
sleep 3
clear
echo "✅ Displaying TOR Domain Name"
cat /var/lib/tor/hidden_service/hostname