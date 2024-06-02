import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  // cache object
  cacheMap = new Map<string, HttpResponse<any>>();
  // cache only specific URLs
  cacheUrls: string[] = ['api/v1/cache/getstatesdatabyid'];

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // check if the request needs to be cached or not
    if (!this.isRequestCachable(request)) {
      return next.handle(request);
    }
    else {
      const url = request.url.toLowerCase();
      if (this.cacheMap.has(url)) {
        return of(this.cacheMap.get(url) as HttpResponse<any>);
      }
      else {
        return next.handle(request).pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              // set in the cache object
              this.cacheMap.set(url, event);
            }
          })
        )
      }
    }

  }

  isRequestCachable(req: HttpRequest<any>): boolean {
    let isCacheable = false;
    // Generally only the GET requests are cached
    if (req.method === 'GET') {
      // check specific URLs to cache
      let matchingUrl = this.cacheUrls.find(url =>
        req.url.toLowerCase().includes(url.toLowerCase()));

      if (matchingUrl) {
        isCacheable = true;
      }
    }

    return isCacheable;
  }
}
