<div class="message-container">
    <header>
        <nav class="icons">
            <a href="#" class="minimize">Minimize</a>
            <a href="#" class="maximize hide">Maximize</a>
            <a href="#" class="close">Close</a>
        </nav>
        <h3 class="subject">{{msg.subject}}</h3>
        {{#if isSentMessage}}
            <p class="date">{{msg.lastActionTime}}</p>
        {{else}}
            <p class="date">{{msg.receivedTime}}</p>
        {{/if}}
        <p data-address="{{msg.fromAddress}}" class="from">From: {{msg.fromAddress}}</p>
        <p data-address="{{msg.toAddress}}" class="to">To: {{msg.toAddress}}</p>
        <nav class="actions">
            {{#if isSentMessage}}
                <!-- <a href="#" class="add-address">Add to address book</a> -->
            {{else}}
                <a href="#" class="reply">Reply</a>
            {{/if}}
            <a href="#" class="trash">Trash</a>
            {{#unless renderHtml}}
                <a href="#" class="render-html">Show HTML</a>
            {{/unless}}
            <a href="#" class="reverse">Reverse thread</a>
            <a href="#" class="prev-msg">Previous</a>
            <a href="#" class="next-msg">Next</a>
        </nav>
    </header>
    <section class="message">{{#if renderHtml}}{{{msg.message}}}{{else}}{{msg.message}}{{/if}}</section>
</div>