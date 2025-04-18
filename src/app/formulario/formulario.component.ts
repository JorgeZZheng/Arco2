import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  guardarPersona() {
    if (this.formulario.valid) {
      const persona = this.formulario.value;
      console.log('Persona guardada:', persona);
      // Aquí puedes enviar los datos a un servicio o guardarlos donde quieras
    } else {
      console.warn('Formulario inválido');
      this.formulario.markAllAsTouched();
    }
  }

  limpiarFormulario() {
    this.formulario.reset();
  }
}
