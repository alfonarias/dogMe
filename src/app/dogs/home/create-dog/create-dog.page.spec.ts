import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateDogPage } from './create-dog.page';

describe('CreateDogPage', () => {
  let component: CreateDogPage;
  let fixture: ComponentFixture<CreateDogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
