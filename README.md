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
You can also hold the "cmd" (mac), "ctrl" (win/linux) key and click the "select all" checkbox to invert the selection.

Join the "Bmr" channel:

    Passphrase: Bmr
    Address: BM-2DBdJhNWQAFmVw8Hjk4fL6Cs6dvUdr5Ftf

### Security using the Bitmessage API remotely

It is insecure to use a remote Bitmessage API directly, as all XMLRPC API calls go over the web using http in cleartext.
That means when your Inbox is downloaded, or when you send a message, the content goes out over the web in plain text (unencrypted).

To protect against this, it is better to open an SSH tunnel to the host your PyBitmessage API/server are running on. You can forward a local port on your remote port to a destination port (typically 8442) on the server (you only need to open up port 8444 in your firewall on the server to transmit to and from the Bitmessage peers).

 This command will forward port 9800 locally to port 8442 on the server, using SSH as a tunnel (typically port 22) to your Bitmessage server host:

    ssh -N -L 9800:localhost:8442 <remote-server-hostname>

When you login to Bmr locally, just use `localhost` as the hostname and port `9800`. This will encrypt all communication to the API using SSH.

By doing this, you are effectively tunneling the API calls directly on the server over SSH. So they are not going out over the web using http.

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
