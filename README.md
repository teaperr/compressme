# Compressme
A simple script to compress files to a target size/percentage with ffmpeg.

### Installing
Download the latest release and follow the below instructions for usage

##### Linux and MacOS
Run this command to install (root required, but you can run the binary from a terminal session without installing)
```bash
curl -sSL https://raw.githubusercontent.com/teaperr/compressme/main/install.sh | bash
```
Run 'compressme' to get usage.

##### Windows
You're basically on your own. I design my programs mainly for Linux and Unix-like systems, as I do not like Microsoft.
To install FFmpeg on Windows, you can find a tutorial [here](https://phoenixnap.com/kb/ffmpeg-windows).
To install compressme on Windows, I'm guessing it's a similar process. If anyone can let me know that this is true, please do.

### Dependencies
[FFmpeg](https://ffmpeg.org/)

### Compiling from source
Compiling from source is simple.

##### Requirements
node.js, npm

1) Clone the repository and cd into the project directory
```bash
git clone https://github.com/teaperr/compressme.git
cd compressme
```
2) Install npm pkg globally
```bash
sudo npm install -g pkg
```
3) Compile
For a compressed binary, run:
```bash
npm run build-compressed
```
else:
```bash
npm run build
```

Binaries should appear in the **dists** directory.

please feel free to open a pr or issue, i'm still learning how to code !!

support my caffeine addiction at [ko-fi.com/teaper_](https://ko-fi.com/teaper_)
