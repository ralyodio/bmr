<section id="settings">
    <h1>Settings</h1>
    <form class="clearfix">
        <fieldset class="has-legend">
            <legend>Link proxy</legend>
            <p>
                <label>
                    {{#if proxy_urls_ixquick }}
                        <input type="radio" name="proxy_urls" value="ixquick" checked>
                    {{else}}
                        <input type="radio" name="proxy_urls" value="ixquick">
                    {{/if}}

                    Show an <a href="https://ixquick.com" class="ext">IxQuick.com</a> proxy link next to URLs in messages
                </label>
            </p>
            <p><small>IxQuick requires you click 'Search' and then 'proxy' from first result (if one is found)...but will hide your IP when viewing a site using their proxy (<a href="https://ixquick.com/eng/privacy-policy.html" class="ext">privacy policy</a>).</small></p>
            <p>
                <label>
                    {{#if proxy_urls_anonymouse }}
                        <input type="radio" name="proxy_urls" value="anonymouse" checked>
                    {{else}}
                        <input type="radio" name="proxy_urls" value="anonymouse">
                    {{/if}}

                    Show an <a href="http://anonymouse.org" class="ext">Anonymouse.org</a> proxy link next to URLs in messages
                </label>
            </p>
            <p><small>Anonymouse shows an advertisement over the proxied page. They have been online since 1997 (<a href="http://anonymouse.org/privacy.html" class="ext">privacy policy</a>).</small></p>
            <p>
                <label>
                    {{#if proxy_urls_webproxynet }}
                        <input type="radio" name="proxy_urls" value="webproxynet" checked>
                    {{else}}
                        <input type="radio" name="proxy_urls" value="webproxynet">
                    {{/if}}

                    Show a <a href="http://webproxy.net/" class="ext">webproxy.net</a> proxy link next to URLs in messages
                </label>
            </p>
            <p>
                <label>
                    {{#if proxy_urls_none }}
                        <input type="radio" name="proxy_urls" value="none" checked>
                    {{else}}
                        <input type="radio" name="proxy_urls" value="none">
                    {{/if}}

                    None - Don't show a proxy link, I don't care for or trust these services
                </label>
            </p>
        </fieldset>

        <button type="submit">Save</button>
    </form>
</section>
