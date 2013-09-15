<section id="subscriptions">
    <table>
        <caption>
            <form id="subscriptions-action" class="action">
                <select id="subscriptions-select-action">
                    <option value="add-subscription">Add subscription</option>
                    <option value="delete-subscription">Delete subscription</option>
                </select>
                <button type="submit">Apply</button>
                <fieldset id="add-subscription" class="clearfix">
                    <p><label>Subscription label: <input type="text" name="label"></label></p>
                    <p><label>Subscription address: <input type="text" name="address"></label></p>
                </fieldset>
            </form>
            {{> filter}}
        </caption>
        <thead>
        <tr>
            <th class="no-sort"><input type="checkbox" name="mark-all"></th>
            <th>Label</th>
            <th>Address</th>
            <th>Enabled</th>
        </tr>
        </thead>
        <tbody></tbody>
    </table>
</section>