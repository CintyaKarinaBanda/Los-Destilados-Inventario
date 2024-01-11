document.addEventListener('DOMContentLoaded', function() {
    var togglePasswordButton = document.getElementById('togglePassword');
    var passwordInput = document.getElementById('password');

    togglePasswordButton.addEventListener('click', function() {
        // Cambia el tipo de entrada de contraseña entre "password" y "text"
        var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Cambia el ícono del ojo basado en el tipo de entrada actual
        var eyeIcon = document.querySelector('#togglePassword i');
        eyeIcon.classList.toggle('fa-eye-slash');
    });
});