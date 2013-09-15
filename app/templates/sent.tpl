<section id="sent">
    <table>
        <caption>
            <form id="sent-action">
                <select>
                    <option value="trash">Move to trash</option>
                </select>
                <button type="submit">Apply</button>
            </form>
            {{> filter}}
        </caption>
        <thead>
        <tr>
            <th class="no-sort"><input type="checkbox" name="mark-all"></th>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
            <th class="status">Status</th>
            <th class="date">Last</th>
        </tr>
        </thead>
        <tbody></tbody>
    </table>
</section>