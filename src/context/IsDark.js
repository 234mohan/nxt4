import React from 'react'

const IsDark = React.createContext({
  isDark: false,
  onchanges: () => {},
  savedList: [],
  onSavedList: () => {},
})

export default IsDark
