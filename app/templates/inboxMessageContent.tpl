<a href="#" class="close">Close</a>
<h3 class="subject">{{msg.subject}}</h3>
<p class="date">{{msg.receivedTime}}</p>
<p data-from="{{msg.fromAddress}}" class="from">From: {{msg.fromAddress}}</p>
<p data-to="{{msg.toAddress}}" class="to">To: {{msg.toAddress}}</p>
<nav>
    <a href="#" class="reply">Reply</a>
    <a href="#" class="trash">Trash</a>
</nav>
<section class="message">{{msg.message}}</section>