{{#each identities}}
    {{#if selected}}
        <option value="{{address}}" selected>{{label}}</option>
    {{else}}
        <option value="{{address}}">{{label}}</option>
    {{/if}}
{{/each}}

