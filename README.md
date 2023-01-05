# Right Next Browser Extension

Right Next browser extension make sure new tab is placed right next to the current tab.

Download: [Mozilla Addons](https://addons.mozilla.org/firefox/addon/right-next/)

## Advantages

Right Next can handle these situations:

- Open new tab in foreground/left click.
- Open new tab in background/middle click.
- Open new tab from pinned tab.
- Open new tab from/to [container](https://support.mozilla.org/en-US/kb/containers) (`tabs` permission required since 2.0.0).

Right Next is also done with very less code which makes it has good performance.

## Requirements

`optional_permissions`:

- `tabs`: please give this permission in order to work with container tabs (since 2.0.0).

Please ensure these settings are the same as the following:

```
browser.tabs.insertAfterCurrent: true
browser.tabs.insertRelatedAfterCurrent: false
```

## End Support

When Mozilla fixed this [issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1485683), then this extension has its mission done.

## Alternative

If you don't open a new tab with middle-click, you can simply change these settings:

```
browser.tabs.insertAfterCurrent: true
browser.tabs.insertRelatedAfterCurrent: false
```

These extensions work well too, but can't handle all situations.

- [Open Tabs Next to Current](https://addons.mozilla.org/firefox/addon/open-tabs-next-to-current/) - can't handle container tab.
- [Always Right](https://addons.mozilla.org/en-US/firefox/addon/always-right/) - can't handle middle-click because it simply changes your browser settings which affect by the issue mentioned above.

Note: Observed on 2021-05-28.

## File an Issue

If you find any unexpected behavior, you can file an issue [here](https://github.com/t7yang/right-next-browser-extension/issues).
