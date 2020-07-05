import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectDogPage } from './select-dog.page';

describe('SelectDogPage', () => {
  let component: SelectDogPage;
  let fixture: ComponentFixture<SelectDogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
