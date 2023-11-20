import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorProfileComponent } from './moderator-profile.component';

describe('ModeratorProfileComponent', () => {
  let component: ModeratorProfileComponent;
  let fixture: ComponentFixture<ModeratorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
