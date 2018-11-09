import { Observable, of } from 'rxjs';

// Generic way of handling error and still return an observable
export function handleError<T> (operation = 'operation', result?: T) {
  // We take in an error and will return an observable
  // of the SAME type as the one specified in the result's field.
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}
