import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared/session.model';

describe('SessionListComponent', () => {
  let sessionListComponent: SessionListComponent;
  let mockAuth;
  let mockVoter;

  beforeEach(() => {
    sessionListComponent = new SessionListComponent(mockAuth, mockVoter);
  });

  describe('ngOnChanges', () => {

    it('should filter the sessions correctly', () => {
      sessionListComponent.sessions = <ISession[]>[
        {name: 'session 1', level: 'intermediate'},
        {name: 'session 2', level: 'intermediate'},
        {name: 'session 3', level: 'beginner'}
      ];

      sessionListComponent.filterBy = 'intermediate';
      sessionListComponent.sortBy = 'name';
      sessionListComponent.eventId = 3 ;

      // this happens naturally when the application is running.
      // However during TDD testing we have to trigger the event ourselves.
      sessionListComponent.ngOnChanges();

      // The list of sessions within the component does not change.
      // The change occurs on the visible list of sessions.
      expect(sessionListComponent.visibleSessions.length).toBe(2);
    });

    it('should sort the sessions correctly', () => {
      sessionListComponent.sessions = <ISession[]>[
        {name: 'session 1', level: 'intermediate'},
        {name: 'session 3', level: 'intermediate'},
        {name: 'session 2', level: 'beginner'}
      ];

      sessionListComponent.filterBy = 'all';
      sessionListComponent.sortBy = 'name';
      sessionListComponent.eventId = 3 ;

      sessionListComponent.ngOnChanges();

      // We sort by alphabetical order, thus the last session
      // should be number 3.
      expect(sessionListComponent.visibleSessions[2].name).toBe('session 3');
    });

  });
});
