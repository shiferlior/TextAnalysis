import { TestBed } from '@angular/core/testing';

import { DefinedWordsGroupService } from './defined-words-group.service';

describe('DefinedWordsGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefinedWordsGroupService = TestBed.get(DefinedWordsGroupService);
    expect(service).toBeTruthy();
  });
});
