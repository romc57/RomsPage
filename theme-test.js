// Test script to validate theme functionality
// Open browser console and paste this script

console.log('=== Theme Toggle Test ===');

// Test 1: Check if theme toggle button exists
const toggle = document.getElementById('theme-toggle');
console.log('1. Theme toggle button found:', !!toggle);

// Test 2: Check current theme
const isLight = document.documentElement.classList.contains('light-theme');
console.log('2. Current theme:', isLight ? 'light' : 'dark');

// Test 3: Check navbar background colo
const navbar = document.querySelector('.navbar');
const navbarStyles = window.getComputedStyle(navbar);
console.log('3. Navbar background:', navbarStyles.backgroundColor);

// Test 4: Test theme toggle functionality
if (toggle) {
    console.log('4. Testing theme toggle...');
    const originalTheme = isLight ? 'light' : 'dark';
    
    // Simulate click
    toggle.click();
    
    setTimeout(() => {
        const newTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
        console.log('   After toggle:', newTheme);
        
        // Toggle back
        toggle.click();
        
        setTimeout(() => {
            const finalTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
            console.log('   After toggle back:', finalTheme);
            console.log('   Test result:', finalTheme === originalTheme ? 'PASS' : 'FAIL');
        }, 100);
    }, 100);
}

// Test 5: Check CSS variables
const rootStyles = window.getComputedStyle(document.documentElement);
console.log('5. CSS Variables:');
console.log('   --background-dark:', rootStyles.getPropertyValue('--background-dark'));
console.log('   --text-primary:', rootStyles.getPropertyValue('--text-primary'));

console.log('=== Test Complete ===');
