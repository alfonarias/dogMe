import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditVacPage } from './edit-vac.page';

describe('EditVacPage', () => {
  let component: EditVacPage;
  let fixture: ComponentFixture<EditVacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVacPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditVacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
