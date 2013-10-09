![Bmr](/app/img/logo.png) Bmr - the Bitmessage reader
===

Bmr is a Bitmessage client written in [node.js](http://nodejs.org) using the [node-webkit](https://github.com/rogerwang/node-webkit/) desktop application framework. It is a self-contained Bitmessage client for reading messages that you can run on your desktop and connect to your Bitmessage server.

Bmr is available for Linux, Mac and Windows desktops.

### Official Releases

Bmr is in active development: [Bmr-v0.0.2](https://github.com/chovy/bmr/releases/tag/0.0.2) is the current release version.

Download, unzip and double-click on "Bmr" app.

* [Linux-32](https://github.com/chovy/bmr/releases/download/0.0.2/Bmr-v0.0.2-linux32.tgz)
* [Linux-64](https://github.com/chovy/bmr/releases/download/0.0.2/Bmr-v0.0.2-linux64.tgz)
* [Mac](https://github.com/chovy/bmr/releases/download/0.0.2/Bmr-v0.0.2-mac.zip)
* [Windows](https://github.com/chovy/bmr/releases/download/0.0.2/Bmr-v0.0.2-win.zip)

It is advised you **always use an SSH tunnel to your Bitmessage server when running Bmr remotely** (see security section below).

Please help improve Bmr by filing bugs, as this is alpha software.

### Installation

#### Bitmessage PyBitmessage (server - required)

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

##### Official release

Download the latest [Bmr release](https://github.com/chovy/bmr/releases) for your platform (Windows, Linux, Mac).

##### Optionally running from source (development only)

To run Bmr from source (to track development inbetween releases), you first need to [download node-webkit](https://github.com/rogerwang/node-webkit#downloads) on your system.

You will need node.js installed on your system to run the 'npm install' command. You can download it from http://nodejs.org or install with [brew](http://brew.sh).

To install Bmr, you need to clone the git repository:

    git clone https://github.com/chovy/bmr.git
    cd ./bmr/app
    npm install

Once you download the `node-webkit` binary, just copy it into the `./bmr/app` directory and then double-click it to launch Bmr.

To update the code just type `git pull`.

Bmr has been tested with MacOS 10.8.4, but these steps should work for Linux too.

If anyone can get this to work on Windows, let me know the steps and I'll add them here.

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
    Address: BM-2cXEHofo7LieKNGNmAPypDUej9BRQvuFYS

On the settings page you can defined a optional proxy service to pass links through that appear in the message body.

### Securely using the Bitmessage API remotely

It is insecure to use a remote Bitmessage API directly, as all XMLRPC API calls go over the web using http in cleartext.
That means when your Inbox is downloaded, or when you send a message, the content goes out over the web in plain text (unencrypted).

To protect against this, it is better to **open an SSH tunnel to the host your PyBitmessage API/server is running on**. You can forward a local port on your computer to a destination port (typically 8442) on the server (you only need to open up port 8444 in your firewall on the server to transmit to and from the Bitmessage peers, you do not need to open up port 8442 for the API, as the tunnel will connect locally to it on the server).

 This command will forward port 9800 on your local computer to port 8442 on the server, using SSH as a tunnel (typically port 22) to your Bitmessage server host:

    ssh -N -L 9800:localhost:8442 <remote-bitmessage-server-hostname>

When you login to Bmr locally, just use `localhost` as the hostname and port `9800`. This will encrypt all communication to the API using SSH before it leaves your computer. You can use whatever port you want locally. `9800` is just an example.

By doing this, you are effectively making the API calls directly on the server over SSH. So they are not going out over the web using http to the API.

### Screenshots

Login to PyBitmessage server (use SSH tunnel for remote access):

![Login](/screenshots/login.png)

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

Search or quote highlighted text:

![Message context menu](/screenshots/message-contextmenu.png)

Optionally render HTML in messages:

![Render HTML](/screenshots/render-html.png)