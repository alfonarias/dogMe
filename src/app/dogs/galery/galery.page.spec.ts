import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GaleryPage } from './galery.page';

describe('GaleryPage', () => {
  let component: GaleryPage;
  let fixture: ComponentFixture<GaleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GaleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
