<label for="from">From</label>
<select name="from" id="from">
{{#each identities}}
    {{#if selected}}
        <option value="{{address}}" selected>{{label}}</option>
    {{else}}
        <option value="{{address}}">{{label}}</option>
    {{/if}}
{{/each}}
</select>
<span id="from-id">{{selectedId}}</span>