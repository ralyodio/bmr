<section id="inbox">
    <table>
        <caption class="clearfix">
            <form id="inbox-action">
                <select>
                    <option value="trash">Move to trash</option>
                    <option value="read">Mark as read</option>
                    <option value="unread">Mark as unread</option>
                </select>
                <button type="submit">Apply</button>
            </form>
            <form id="filter">
                <label for="filter-value">Filter</label>
                <input type="text" name="filter-value" id="filter-value">
                <label><input type="checkbox" name="include" id="include" value="from"> include from</label>
                <button type="reset">Clear</button>
            </form>
        </caption>
        <thead>
        <tr>
            <th class="no-sort"><input type="checkbox" name="mark-all"></th>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
            <th class="date">Date</th>
        </tr>
        </thead>
        <tbody></tbody>
    </table>
</section>