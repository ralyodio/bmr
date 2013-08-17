Bmr - the Bitmessage reader
===

Bmr (pronounced "beamer") is a Bitmessage client written in [node.js](http://nodejs.org) using the [node-webkit](https://github.com/rogerwang/node-webkit/) desktop application framework.

### Status

Active development, no public release yet. Feel free to download, build and take a look.

### Development

You must already have PyMessage server running locally with api enabled.

You first need to install node-webkit on your system.

To install, you need to clone the git repo:

    git clone https://github.com/chovy/bmr.git
    cd ./bmr

Run the ./build script to build the node-webkit `bmr.nw` app:

    ./build

Then run the ./start script (linux/mac):

    ./start

Or do both at once:

    ./build && ./start

I've only tested with MacOS 10.8.4 so far, but these steps should work for Linux too.

