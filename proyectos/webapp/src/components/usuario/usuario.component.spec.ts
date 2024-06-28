import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioComponent } from './usuario.component';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuariosServiceTestImpl } from '../../services/usuarios/usuarios.service.test.impl';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioComponent],
      providers: [{ provide: UsuariosService, useClass: UsuariosServiceTestImpl }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Debe estar en estado INICIADO', () => {
    expect(component.estado).toBe(0);
    component.comenzarEdicion();
    expect(component.estado).toBe(4);
  }

});
