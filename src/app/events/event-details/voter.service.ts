import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';

import { ISession } from '../shared/session.model';
import { handleError, ApplicationJsonHttpHeaders } from '../../common/index';

@Injectable()
export class VoterService {

  constructor(private http: HttpClient) { }

  deleteVoter(eventId: number, session: ISession, userName: string ) {
    // we are changing the content of the 'voters' field for the given parameter
    // we remove from it any 'voter' which matches the given filter.
    session.voters = session.voters.filter(
      voter => {
        return voter !== userName;
      }
    );
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName}`;
    this.http.delete(url)
             .pipe(catchError(handleError('deleteVoter')))
             .subscribe();
  }

  addVoter(eventId: number, session: ISession, userName: string ) {
    session.voters.push(userName);
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName}`;
    this.http.post(url,
                   // passing an empty object as the body as the URL has all the data required for this call.
                   {},
                   ApplicationJsonHttpHeaders)
              .pipe(catchError(handleError('addVoter')) )
              // self-subscribe instead of returning an observable. We know, by design, the caller is not expecting data.
              .subscribe();
  }

  userHasVoted(session: ISession, userName: string ) {
    return session.voters.some(voter => voter === userName );
  }
}
