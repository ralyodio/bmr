![Bmr](/app/img/logo.png) Bmr - the Bitmessage reader
===

Bmr, pronounced "beamer", is a Bitmessage client written in [node.js](http://nodejs.org) using the [node-webkit](https://github.com/rogerwang/node-webkit/) desktop application framework. It is a self-contained Bitmessage client for reading messages that you can run on your desktop and connect to your Bitmessage server.

### Development Status

Bmr is in active development, however there is no public package release yet. Feel free to download, build and take a look as it progresses.

### Installation

#### Bitmessage PyMessage (server)

You must already have the Bitmessage [PyMessage](https://github.com/Bitmessage/PyBitmessage) server API running locally with api enabled (see the instructions for [installation](https://bitmessage.org/wiki/Compiling_instructions)).

Find your `keys.dat` file:

    # Linux
    ~/.config/PyMessage/keys.dat

    # Mac
    ~/Library/Application Support/PyBitmessage/keys.dat

Add the following lines to the bottom of the `[bitmessagesettings]` section:

    [bitmessagesettings]
    #...other config options
    apienabled = true
    apiport = 8442
    apiinterface = 0.0.0.0
    apiusername = edward
    apipassword = 5n0wd3n

If you want to run PyMessage in Daemon mode without the client starting, add `daemon = true` to `[bitmessagesettings]`.

#### Bmr (client -- this app)

To run Bmr, you first need to [download and install node-webkit](https://github.com/rogerwang/node-webkit#downloads) on your system.

To install Bmr, you need to clone the git repository:

    git clone https://github.com/chovy/bmr.git
    cd ./bmr

Run the ./build script to build the node-webkit `bmr.nw` app:

    ./build

Then run the ./start script (linux/mac):

    ./start

Or run both at once:

    ./build && ./start

I've only tested with MacOS 10.8.4 so far, but these steps should work for Linux too.
If anyone can get this to work on Windows, let me the know the steps and I'll add them here. Once the app stablizes and basic functionality is working I will build packages to download and install.