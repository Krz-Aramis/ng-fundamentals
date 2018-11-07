export interface ISession {
  id: number;
  name: string;
  presenter: string;
  duration: number;
  level: string;
  abstract: string;
  voters: string[];
}

export function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name)
  {
    return 1 ;
  }
  else if (s1.name === s2.name)
  {
    return 0 ;
  }
  else
  {
    return -1 ;
  }
}

export function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
