![Bmr](/app/img/logo.png) Bmr - the Bitmessage reader
===

Bmr, pronounced "beamer", is a Bitmessage client written in [node.js](http://nodejs.org) using the [node-webkit](https://github.com/rogerwang/node-webkit/) desktop application framework. It is a self-contained Bitmessage client for reading messages that you can run on your desktop and connect to your Bitmessage server.

### Development Status

Bmr is in active development, however there is no official package release yet. Feel free to download, build and take a look as it progresses.

### Installation

#### Bitmessage PyBitmessage (server)

You must already have the Bitmessage [PyBitmessage](https://github.com/Bitmessage/PyBitmessage) server API running locally with api enabled (see the instructions for [installation](https://bitmessage.org/wiki/Compiling_instructions)).

Find your `keys.dat` file:

    # Linux
    ~/.config/PyBitmessage/keys.dat

    # Mac
    ~/Library/Application Support/PyBitmessage/keys.dat

    # Windows
    C:\Users\[Username]\AppData\Roaming\PyBitmessage\keys.dat

Add the following lines to the bottom of the `[bitmessagesettings]` section:

    [bitmessagesettings]
    #...other config options
    apienabled = true
    apiport = 8442
    apiinterface = 0.0.0.0
    apiusername = edward
    apipassword = 5n0wd3n

If you want to run PyBitmessage in Daemon mode without the PyQT client starting, add `daemon = true` to `[bitmessagesettings]`.

#### Bmr (client -- this app)

##### Running from source

To run Bmr, you first need to [download node-webkit](https://github.com/rogerwang/node-webkit#downloads) on your system.

Until I release an official package, you will need node.js installed on your system to run the 'npm install' command. You can download it from http://nodejs.org or install with [brew](http://brew.sh).

To install Bmr, you need to clone the git repository:

    git clone https://github.com/chovy/bmr.git
    cd ./bmr/app
    npm install

Once you download the `node-webkit` binary, just copy that into the `./bmr/app` directory and then double-click it to launch Bmr.

To update the code just type `git pull`.

##### Alternative: build it

Run the ./build script to build the node-webkit `bmr.nw` app:

    ./build

Then run the ./start script (linux/mac):

    ./start

Bmr has been tested with MacOS 10.8.4, but these steps should work for Linux too.

If anyone can get this to work on Windows, let me know the steps and I'll add them here. Once the app stabilizes and basic functionality is working I will build packages to download and install for each platform (linux, mac, windows).

### Tips

In the search filter fields on Inbox and Sent box you can type the following meta filters to search specific fields:

    :unread
    :read
    :to <bm-address-partial>
    :from <bm-address-partial>
    <subject-partial>

On tables, you can multi select ranges of items by holding the "shift" key, then checking another box a few rows down.
You can also hold the "cmd" (mac) key and click the "select all" checkbox to reverse the selection.

Join the "Bmr" channel:

    Passphrase: Bmr
    Address: BM-2DBdJhNWQAFmVw8Hjk4fL6Cs6dvUdr5Ftf

### Screenshots

Compose a new message:

![Compose](/screenshots/compose.png)

Read a new message:

![Read](/screenshots/read-message.png)

Reply to a message:

![Reply](/screenshots/reply.png)

Subscriptions list:

![Subscriptions](/screenshots/subscriptions.png)

Filter inbox using the meta filter ":unread":

![Filter](/screenshots/filter-unread.png)

Optionally render HTML in messages:

![Render HTML](/screenshots/render-html.png)
