import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SessionListComponent } from './session-list.component';
import { DurationPipe } from '../shared/duration.pipe';
import { UpvoteComponent } from './upvote.component';
import { CollapsibleWellComponent } from '../../common/collapsible-well.component';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';
import { ISession } from '../shared/session.model';

describe('SessionListComponent', () => {
  // Wrapper around the component itself.
  // Allows us to access key component elements, such as change detection and/or dependency injection.
  let fixture: ComponentFixture<SessionListComponent>;
  // the component we are testing
  let component: SessionListComponent;
  // HTMLElement is a global, no import needed
  let element: HTMLElement;
  // Wrapper around the HTML Element;
  // Provides additional functionalities that are not available in the native underlying element.
  let debugEl: DebugElement;

  beforeEach(async(() => {
    // We are providing implementation for the functionalities that are used as part of our tests on the component.
    // This is why not all of the functionalities for all of the services are mocked.
    let mockAuthService = {
      isAuthenticated: () => true,
      currentUser: {userName: 'Joe'}
    };
    let mockVoterService = {
      userHasVoted: () => true
    };
    // Async forces the component to be created synchronously.
    // configureTestingModule normally works asynchronously
    TestBed.configureTestingModule(
      {
        // empty in this case, but if we were testing forms, we would import Forms here.
        imports: [],
        declarations: [
          SessionListComponent,
          UpvoteComponent,
          DurationPipe,
          CollapsibleWellComponent
        ],
        providers: [
          // We do not want to make HTTP calls during testing,
          // thus using the long hand notation, we can supply our 'mocks' instead to the SessionListComponent
          { provide: AuthService, useValue: mockAuthService },
          { provide: VoterService, useValue: mockVoterService}
        ],
        schemas: [
          // this section can be used to tell Angular to ignore some errors,
          // such as missing child components.
          // it can be misleading to do so though as this might hide genuine problems.
          // NO_ERRORS_SCHEMA
          // The value of the above cannot be understated though. It makes easier to test the component and its template.
        ]
      });
    }));

  beforeEach(() => {
    this.fixture = TestBed.createComponent(SessionListComponent);
    this.component = this.fixture.componentInstance;
    this.debugEl = this.fixture.debugElement;
    this.element = this.fixture.nativeElement;
  });

  describe('intial display', () => {

    it('should have the correct session title', () => {
      // We arrange our data
      this.component.sessions = [
        {id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']}
      ];
      this.component.filterBy = 'all';
      this.component.sortBy = 'name';
      this.component.eventId = 7;

      // Now we act (or change) the state of our component.
      // Because we are in a test and the main logic occurs in the onChange handler, we need to call it programmatically.
      // onChange is only triggered if the input properties are changed by a parent component.
      this.component.ngOnChanges();
      // Now we need Angular to update the HTML code
      this.fixture.detectChanges();

      // With HTML template rendered, now we can set some expectations.
      // Since we have an handle on the root element of our template.
      // We can execute a query/selector search for the DOM element that contains the session name text
      // using instead of toBe just in case other information appears along side.
      expect(this.element.querySelector('[well-title]').textContent).toContain('Session 1');
      // The above can be achieved using the DebugElement instead.
      // Debug Element is an Angular utility whereas in the above we are using the raw html.
      // The 'By' predicate allows for selecting by 'directive' which is not possible in raw html.
      expect(this.debugEl.query(By.css('[well-title]'))
          .nativeElement.textContent)
          .toContain('Session 1');
    });
  });
});
