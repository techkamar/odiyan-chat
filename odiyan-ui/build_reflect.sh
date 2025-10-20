# Builds and copies the file into proper backend locations

# Set NVM for Bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Make assets dir if not exists
mkdir ../odiyan-backend/assets

# Set Proper NVM version
nvm install 23

# Run the build
npm run build

# Copy relevant files to proper places
echo "Copying Build files to Backend"
cp dist/index.html ../odiyan-backend/index.html
# Clear existing
rm ../odiyan-backend/assets/*.*
cp dist/assets/*.* ../odiyan-backend/assets/

