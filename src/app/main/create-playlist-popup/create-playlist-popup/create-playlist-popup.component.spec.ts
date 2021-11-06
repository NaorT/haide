import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaylistPopupComponent } from './create-playlist-popup.component';

describe('CreatePlaylistPopupComponent', () => {
  let component: CreatePlaylistPopupComponent;
  let fixture: ComponentFixture<CreatePlaylistPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlaylistPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaylistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
