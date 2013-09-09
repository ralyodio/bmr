<section id="identities">
    <table>
        <caption>
            <form id="identities-action">
                <select id="identities-select-action">
                    <option value="create-address">Create address</option>
                    <option value="create-deterministic">Create deterministic address</option>
                    <!-- not supported by API yet
                    <option value="enable-address">Enable address</option>
                    <option value="disable-address">Disable address</option>
                    -->
                </select>
                <button type="submit">Apply</button>
                <fieldset id="create-address" class="clearfix">
                    <div>
                        <p><label>Address label: <input type="text" name="label"></label></p>
                        <p><label><input type="checkbox" name="eighteenByteRipe"> Do extra work for shorter address (18-byte RIPE)</label></p>
                    </div>
                    <div>
                        <p><label>Total difficulty: <input type="text" class="small" name="totalDifficulty" value="1.0" maxlength="3"></label></p>
                        <p><label>Small message difficulty: <input class="small" type="text" name="smallMessageDifficulty" value="1.0"></label></p>
                    </div>
                </fieldset>
                <fieldset id="create-deterministic" class="clearfix hide">
                    <div>
                        <p>
                            <label>Address passphrase: <input type="text" name="passphrase"></label>
                        </p>
                        <p>
                            <label>Number of addresses: <input type="text" name="number" size="1" value="1"></label>
                        </p>
                        <p>
                            <label><input type="checkbox" name="eighteenByteRipe"> Do extra work for shorter address (18-byte RIPE)</label>
                        </p>
                    </div>
                    <div>
                        <p><label>Total difficulty: <input type="text" class="small" name="totalDifficulty" value="1.0" maxlength="3"></label></p>
                        <p><label>Small message difficulty: <input class="small" type="text" name="smallMessageDifficulty" value="1.0"></label></p>
                    </div>
                </fieldset>
                <!--
                <fieldset id="enable-address" class="hide">
                    enable
                </fieldset>
                <fieldset id="disable-address" class="hide">
                    disable
                </fieldset>
                -->
            </form>
        </caption>
        <thead>
        <tr>
            <th class="no-sort"><input type="checkbox" name="mark-all"></th>
            <th>Label</th>
            <th>Address</th>
            <th>Enabled</th>
            <th>Stream</th>
        </tr>
        </thead>
        <tbody></tbody>
    </table>
</section>