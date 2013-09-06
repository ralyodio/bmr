<div class="message-container">
    <a href="#" class="close">Close</a>
    <h3 class="subject">{{msg.subject}}</h3>
    {{#if isSentMessage}}
        <p class="date">{{msg.lastActionTime}}</p>
    {{else}}
        <p class="date">{{msg.receivedTime}}</p>
    {{/if}}
    <p data-address="{{msg.fromAddress}}" class="from">From: {{msg.fromAddress}}</p>
    <p data-address="{{msg.toAddress}}" class="to">To: {{msg.toAddress}}</p>
    <nav>
        {{#if isSentMessage}}
            <!-- <a href="#" class="add-address">Add to address book</a> -->
        {{else}}
            <a href="#" class="reply">Reply</a>
        {{/if}}
        <a href="#" class="trash">Trash</a>
        {{#unless renderHtml}}
            <a href="#" class="render-html">Show HTML</a>
        {{/unless}}
    </nav>
    {{#if renderHtml}}
        <section class="message">{{{msg.message}}}</section>
    {{else}}
        <section class="message">{{msg.message}}</section>
    {{/if}}
</div>