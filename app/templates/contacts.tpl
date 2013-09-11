<section id="contacts">
    <table>
        <caption>
            <form id="contacts-action">
                <select id="contacts-select-action">
                    <option value="add-contact">Add contact</option>
                    <option value="delete-contact">Delete contact</option>
                </select>
                <button type="submit">Apply</button>
                <fieldset id="add-contact" class="clearfix">
                    <p><label>Contact label: <input type="text" name="label"></label></p>
                    <p><label>Contact address: <input type="text" name="address"></label></p>
                </fieldset>
            </form>
        </caption>
        <thead>
            <tr>
                <th class="no-sort"><input type="checkbox" name="mark-all"></th>
                <th>Label</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</section>