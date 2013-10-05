{{#each messages}}
<tr data-id="{{id}}" data-status="{{status}}" data-ack="{{ack}}">
    <td class="mark-item"><input type="checkbox" name="mark" value="{{ack}}"></td>
    <td data-sort="{{from}}"><span class="from nowrap" data-address="{{from}}">{{from}}</span></td>
    <td data-sort="{{to}}"><span class="to nowrap" data-address="{{to}}">{{to}}</span></td>
    <td data-sort="{{subject}}">
        {{#if subject}}
            <span class="subject wrap">{{subject}}</span>
        {{else}}
            <span class="subject wrap">--</span>
        {{/if}}
    </td>
    <td class="nowrap" data-sort="{{status}}"><span title="{{lastActionTime}}">{{status}}</span></td>
    <td class="nowrap" data-sort="{{timeSortable}}"><span title="{{time}}">{{timeReadable}}</span></td>
</tr>
{{/each}}