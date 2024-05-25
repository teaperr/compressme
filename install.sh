#!/bin/bash

install_dir="/usr/local/bin"

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo curl -sSL https://github.com/teaperr/compressme/releases/latest/download/compressme-linux -o "$install_dir/compressme"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    sudo curl -sSL https://github.com/teaperr/compressme/releases/latest/download/compressme-macos -o "$install_dir/compressme"
else
    echo "Unknown OS type"
    exit
fi

sudo chmod +x "$install_dir/compressme"

echo "Installation complete. You can now use Compressme!"
