{{#each messages}}
<tr data-id="{{id}}" class="{{class}}">
    <td class="mark-item"><input type="checkbox" name="mark" value="{{id}}"></td>
    <td data-sort="{{from}}"><span class="from nowrap" data-address="{{from}}">{{from}}</span></td>
    <td data-sort="{{to}}"><span class="to nowrap" data-address="{{to}}">{{to}}</span></td>
    <td data-sort="{{subject}}">
    {{#if subject}}
        <span class="subject wrap">{{subject}}</span>
    {{else}}
        <span class="subject wrap">--</span>
    {{/if}}
    </td>
    <td class="nowrap" data-sort="{{timeSortable}}"><span title="{{time}}">{{timeReadable}}</span></td>
    <td class="nowrap right" data-sort="{{bytes}}"><span class="size">{{size}}</span></td>
</tr>
{{/each}}