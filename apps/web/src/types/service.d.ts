/**
 * Service interface
 * via vite alias to inject service adapter
 */
declare module '@service' {
  export const service: import('@/service/types').Service
}
