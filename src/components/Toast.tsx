import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { hideToast } from '../store/slices/uiSlice'

export default function Toast() {
  const dispatch = useAppDispatch()
  const { message, type, visible } = useAppSelector((state) => state.ui)

  useEffect(() => {
    if (!visible) return

    const timer = setTimeout(() => {
      dispatch(hideToast())
    }, 2500)

    return () => clearTimeout(timer)
  }, [visible, message, dispatch])

  if (!visible || !message) return null

  const alertClass =
    type === 'success'
      ? 'alert-success'
      : type === 'error'
        ? 'alert-error'
        : 'alert-info'

  return (
    <div className="toast toast-end toast-bottom z-50">
      <div className={`alert ${alertClass} shadow-lg`}>
        <span>{message}</span>
      </div>
    </div>
  )
}
