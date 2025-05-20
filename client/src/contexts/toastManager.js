let toastId

export const setToastId = (id) => {
  toastId = id
}

export const getToastId = () => toastId
export const clearToastId = () => {
  toastId = undefined
}
