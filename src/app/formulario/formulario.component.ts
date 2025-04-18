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
      nombre: ['', [Validators.required, Validators.pattern(/^\S.*\S$/)]],  
      apellido: ['', [Validators.required, Validators.pattern(/^\S.*\S$/)]], 
      edad: [18, [Validators.required, Validators.min(18), Validators.max(100)]], 
      email: ['', [Validators.required, Validators.email]] 
    });
  }

  
  guardarPersona() {
    if (this.formulario.valid) {
      const persona = this.formulario.value;
      console.log('Persona guardada:', persona);
    } else {
      console.warn('Formulario inválido');
      this.formulario.markAllAsTouched(); 
    }
  }

  limpiarFormulario() {
    this.formulario.reset();
  }

  getErrorMessage(controlName: string): string {
    const control = this.formulario.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    } else if (control?.hasError('pattern')) {
      return 'No se permiten espacios al principio o al final';
    } else if (control?.hasError('min') || control?.hasError('max')) {
      return 'La edad debe estar entre 18 y 100';
    } else if (control?.hasError('email')) {
      return 'Correo electrónico no válido';
    }
    return '';
  }
}
