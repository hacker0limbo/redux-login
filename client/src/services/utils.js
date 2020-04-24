export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

export const uuid = () => Math.random().toString(36).substring(2) + Date.now().toString(36)