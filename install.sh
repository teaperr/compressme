#!/bin/bash

line='export PATH="$HOME/bin:$PATH"'
install_dir="$HOME/bin"

mkdir -p "$install_dir"
curl -sSL https://raw.githubusercontent.com/teaperr/compressme/main/compressme -o "$install_dir/compressme"
chmod +x "$install_dir/compressme"

if ! grep -qF "$line" ~/.bashrc; then
    echo "$line" >> ~/.bashrc
fi

source ~/.bashrc

echo "Installation complete. You can now use Compressme!"
