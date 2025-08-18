/**
 * Contact Form Module
 * Handles contact form validation and submission
 */

class ContactForm {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.setupFormHandling();
        }
    }

    setupFormHandling() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(e.target);
        });
    }

    handleSubmit(form) {
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Process form submission
        this.submitForm(data, form);
    }

    validateForm(data) {
        const { name, email, subject, message } = data;

        // Check for empty fields
        if (!name || !email || !subject || !message) {
            this.showAlert('Please fill in all fields.');
            return false;
        }

        // Validate email
        if (!this.isValidEmail(email)) {
            this.showAlert('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    submitForm(data, form) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        this.showAlert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
    }

    showAlert(message) {
        alert(message);
        // In a real application, you might want to use a custom modal or toast notification
    }
}

export default ContactForm;
