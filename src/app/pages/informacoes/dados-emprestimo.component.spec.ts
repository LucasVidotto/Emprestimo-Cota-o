import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEmprestimoComponent } from './dados-emprestimo.component';

describe('DadosEmprestimoComponent', () => {
  let component: DadosEmprestimoComponent;
  let fixture: ComponentFixture<DadosEmprestimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosEmprestimoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
