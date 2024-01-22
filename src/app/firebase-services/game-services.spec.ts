import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameServices } from './game-services';

describe('FirebaseServices', () => {
  let component: GameServices;
  let fixture: ComponentFixture<GameServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameServices]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
