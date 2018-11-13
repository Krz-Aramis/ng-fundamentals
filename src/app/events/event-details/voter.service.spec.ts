import {of, Observable} from 'rxjs';

import { VoterService } from './voter.service';
import { ISession } from '../shared/session.model';

describe('VoterService', () => {
  let voterService: VoterService;
  let mockHttp;

  beforeEach( () => {
    // delete and post, are the only 2 HTTP methods that this service is using.
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    // Using this approach, each test gets a fresh copy of the service.
    // This way, they are isolated from any state changes that may occur during a given test.
    voterService = new VoterService(mockHttp);

  });

  describe('deleteVoter', () => {

    it('should remove the voter from the list of voters', () => {

      const session = {id: 6 , voters: ['joe', 'john']};
      // this statement defines the return value the mock object will provide when the delete method is called.
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, <ISession>session, 'joe');

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
    });

    it('should call http.delete with the correct URL', () => {
      const session = {id: 6 , voters: ['joe', 'john']};
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, <ISession>session, 'joe');

      // Here we ensure that the mock object was called with the correct url
      expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/3/sessions/${session.id}/voters/joe`);
    });
  });


  describe('addVoter', () => {

    it('should call http.post with the correct URL', () => {
      const session = {id: 6 , voters: ['john']};
      mockHttp.post.and.returnValue(of(false));

      voterService.addVoter(3, <ISession>session, 'joe');

      // Here we ensure that the mock object was called with the correct url
      expect(mockHttp.post).toHaveBeenCalledWith(
                              `/api/events/3/sessions/${session.id}/voters/joe`,
                              // We should be posting with data in the body... here it is empty.
                              {},
                              // We do not have access to the options, however it is fairly simple,
                              // so let's assume that there is an object here.
                              jasmine.any(Object));
    });
  });

});
