import { Injectable } from '@angular/core';
import { ISession } from '../shared/session.model';

@Injectable()
export class VoterService {

  constructor() { }

  deleteVoter(session: ISession, userName: string ) {
    // we are changing the content of the 'voters' field for the given parameter
    // we remove from it any 'voter' which matches the given filter.
    session.voters = session.voters.filter(
      voter => {
        return voter !== userName;
      }
    );
  }
  addVoter(session: ISession, userName: string ) {
    session.voters.push(userName);
  }

  userHasVoted(session: ISession, userName: string ) {
    return session.voters.some(voter => voter === userName );
  }
}
