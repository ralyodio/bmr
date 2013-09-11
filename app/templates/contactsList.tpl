{{#each contacts}}
    <tr data-address="{{address}}">
        <td class="mark-item"><input type="checkbox" name="mark" value="{{address}}"></td>
        <td data-sort="{{label}}"><span class="nowrap label">{{label}}</span></td>
        <td data-sort="{{address}}"><span class="nowrap address">{{address}}</span></td>
    </tr>
{{/each}}
