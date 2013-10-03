<form id="reply" method="post">
    <input type="hidden" name="id" value="{{msg.msgid}}">
    <fieldset>
        <p>{{> from this}}</p>
        <p><label for="reply-to">To</label> <input type="text" name="to" id="reply-to" value="{{msg.fromAddress}}"></p>
        <p><label for="reply-subject">Subject</label> <input type="text" name="subject" id="reply-subject" value="{{msg.subject}}"></p>
        <textarea name="message" class="message" id="reply-body">{{#if quote}}{{quote}}&#13;&#10;&#13;&#10;{{/if}}&#13;&#10;&#13;&#10;------------------------------------------------------&#13;&#10;{{msg.message}}</textarea>
    </fieldset>
</form>