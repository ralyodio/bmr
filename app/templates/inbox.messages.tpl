{{#each messages}}
<tr data-id="{{id}}">
    <td class="mark-item"><input type="checkbox" name="mark" value="{{id}}"></td>
    <td data-sort="{{from}}"><span class="nowrap" data-from="{{from}}">{{from}}</span></td>
    <td data-sort="{{to}}"><span class="nowrap" data-to="{{to}}">{{to}}</span></td>
    <td data-sort="{{subject}}"><span class="subject wrap">{{subject}}</span></td>
    <td class="nowrap" data-sort="{{timeSortable}}"><span title="{{time}}">{{timeReadable}}</span></td>
</tr>
{{/each}}