import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // The QR landing depends on a runtime parameter, so it must be rendered
  // per-request rather than prerendered at build time.
  { path: 'c/:carId', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender },
];
