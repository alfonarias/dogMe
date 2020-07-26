import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DogSelectorPage } from './dog-selector.page';

describe('DogSelectorPage', () => {
  let component: DogSelectorPage;
  let fixture: ComponentFixture<DogSelectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogSelectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DogSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
