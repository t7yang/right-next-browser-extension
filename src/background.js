(async function rightNext() {
  /**
   * @type {Map<number, {tabId: number, previousTabId: number | undefined, windowId: number}>}
   */
  const activeTabs = new Map();

  /** intial process, save activate tab for each windows */
  browser.tabs.query({ active: true }).then(tabs =>
    tabs.forEach(tab =>
      activeTabs.set(tab.windowId, {
        tabId: tab.id,
        windowId: tab.windowId,
        previousTabId: browser.tabs.TAB_ID_NONE,
      }),
    ),
  );

  /** handler: update latest activate tab */
  browser.tabs.onActivated.addListener(tab => {
    activeTabs.set(tab.windowId, tab);
  });

  /** handler: rearrange new create tab  */
  browser.tabs.onCreated.addListener(tab => {
    const activeTab = activeTabs.get(tab.windowId);
    tab.index > 1 && // ignore 0 and 1, 0: the only tab in window; 1: new tab beside 1st tab
      Promise.all([tab.openerTabId || activeTab.tabId, browser.permissions.contains({ permissions: ['tabs'] })])
        .then(([leftId, hasTabsPermit]) =>
          browser.tabs.get(leftId).then(tab =>
            // container will immediately kill the new tab and create a new container tab
            // if all conditions true, use previous tab instead
            hasTabsPermit && tab.status === 'loading' && tab.url === 'about:blank'
              ? browser.tabs.get(activeTab.previousTabId)
              : tab,
          ),
        )
        .then(tab =>
          tab.pinned // if left tab is a pinned tab, need to find the currect insert position
            ? browser.windows
                .get(tab.windowId, { populate: true })
                .then(win => win.tabs.findIndex((_, idx, arr) => !arr[idx + 1] && arr[idx + 1].pinned) + 1)
            : tab.index + 1,
        )
        .then(index => browser.tabs.move(tab.id, { index }))
        .catch(console.error);
  });
})();
