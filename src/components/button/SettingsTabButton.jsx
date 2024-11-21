import React from 'react'

const SettingsTabButton = ({
    contentText,
    callback,
    id, selecteTab
}) => {
  return (
    <button
    className={`nav-link ${selecteTab === contentText ? 'active':''}`}
    // id={`${id}-tab`}
    data-bs-toggle="tab"
    // data-bs-target="#notification"
    // data-bs-target={`#${id}`}

    type="button"
    role="tab"
    // aria-controls={`${id}`}
    aria-selected="false"
    // onClick={() => setTabName(TAB_NAME.SETTING)}
    onClick={callback}
  >
    {contentText}
  </button>
  )
}

export default SettingsTabButton