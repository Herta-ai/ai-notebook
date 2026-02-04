export const AUTH_CONFIG = {
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    exp: process.env.JWT_EXPIRES_IN || '7d',
  },
  refreshJwt: {
    secret: process.env.JWT_REFRESH_SECRET || 'supersecretrefreshkey',
    exp: process.env.JWT_REFRESH_EXPIRES_IN || '14d',
  },
}

export function getExpInSeconds(exp: string | number): number {
  if (typeof exp === 'number')
    return exp

  const match = exp.match(/^(\d+)([dhms])$/)
  if (!match)
    return 7 * 24 * 60 * 60 // default 7 days if parse fails

  const value = Number.parseInt(match[1])
  const unit = match[2]

  switch (unit) {
    case 'd': return value * 24 * 60 * 60
    case 'h': return value * 60 * 60
    case 'm': return value * 60
    case 's': return value
    default: return 7 * 24 * 60 * 60
  }
}
