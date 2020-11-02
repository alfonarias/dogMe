import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateVacPage } from './create-vac.page';

describe('CreateVacPage', () => {
  let component: CreateVacPage;
  let fixture: ComponentFixture<CreateVacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVacPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateVacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
