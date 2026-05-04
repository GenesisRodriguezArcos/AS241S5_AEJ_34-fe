import Swal from 'sweetalert2';

const base = {
  background: '#0f0a28',
  color: '#cdd6f4',
  confirmButtonColor: '#7c3aed',
  cancelButtonColor: '#374151',
  customClass: {
    popup:          'swal-popup',
    confirmButton:  'swal-confirm',
    cancelButton:   'swal-cancel',
    title:          'swal-title',
    htmlContainer:  'swal-html',
  },
};

export const alertSuccess = (title, text) =>
  Swal.fire({ ...base, icon: 'success', title, text, timer: 2000, showConfirmButton: false });

export const alertError = (title, text) =>
  Swal.fire({ ...base, icon: 'error', title, text });

export const alertConfirm = (title, text) =>
  Swal.fire({
    ...base,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

export const alertConfirmRestore = (title, text) =>
  Swal.fire({
    ...base,
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: 'Sí, restaurar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#059669',
  });
