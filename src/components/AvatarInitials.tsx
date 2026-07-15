import { getInitials } from '../utils/initials'

interface AvatarInitialsProps {
  name: string
  /** Tailwind size class, e.g. w-9, w-16 */
  size?: string
  /** Text size for initials */
  textClass?: string
}

/**
 * DaisyUI v5 avatar with initials.
 * Uses `avatar-placeholder` (renamed from `placeholder` in daisyUI 5).
 */
export default function AvatarInitials({
  name,
  size = 'w-10',
  textClass = 'text-sm',
}: AvatarInitialsProps) {
  const initials = getInitials(name)

  return (
    <div className="avatar avatar-placeholder">
      <div
        className={`${size} rounded-full bg-primary text-primary-content flex items-center justify-center`}
      >
        <span className={`${textClass} font-bold leading-none`}>{initials}</span>
      </div>
    </div>
  )
}
