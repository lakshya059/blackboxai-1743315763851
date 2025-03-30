// Admin Authentication
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Simple validation
        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }
        
        // Disable submit button during processing
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i> Authenticating...
        `;
        
        // Simulate authentication (2 second delay)
        setTimeout(() => {
            // In a real implementation, this would call an API
            if (username === 'admin' && password === 'admin123') {
                // Successful login
                localStorage.setItem('adminAuthToken', 'simulated-token');
                window.location.href = 'dashboard.html';
            } else {
                // Failed login
                showError('Invalid username or password');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
            }
        }, 2000);
    });

    // Show error message
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.login-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and display new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'login-error bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded';
        errorDiv.innerHTML = `<p>${message}</p>`;
        
        // Insert after the form title
        const formTitle = document.querySelector('form h1') || 
                         document.querySelector('form p');
        formTitle.parentNode.insertBefore(errorDiv, formTitle.nextSibling);
        
        // Shake animation
        loginForm.classList.add('animate-shake');
        setTimeout(() => {
            loginForm.classList.remove('animate-shake');
        }, 500);
    }

    // Check for existing session
    function checkSession() {
        const authToken = localStorage.getItem('adminAuthToken');
        if (authToken && window.location.pathname.endsWith('admin/index.html')) {
            // Redirect to dashboard if already logged in
            window.location.href = 'dashboard.html';
        } else if (!authToken && !window.location.pathname.endsWith('admin/index.html')) {
            // Redirect to login if not authenticated
            window.location.href = 'index.html';
        }
    }

    // Initialize session check
    checkSession();
});

// Add shake animation to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    .animate-shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
`;
document.head.appendChild(style);