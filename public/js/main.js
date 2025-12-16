// Frontend JavaScript for MAKE YOUR OWN
document.addEventListener('DOMContentLoaded', () => {
    const ideaInput = document.getElementById('idea-input');
    const submitBtn = document.getElementById('submit-btn');
    const responseContainer = document.getElementById('response-container');
    const responseTitle = document.getElementById('response-title');
    const responseMessage = document.getElementById('response-message');
    const nextSteps = document.getElementById('next-steps');

    // Submit idea when button is clicked
    submitBtn.addEventListener('click', submitIdea);

    // Also allow submission with Enter key (with Shift+Enter for new line)
    ideaInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitIdea();
        }
    });

    async function submitIdea() {
        const idea = ideaInput.value.trim();

        if (!idea) {
            alert('Please share what you want to make first!');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = '';
        submitBtn.innerHTML = '<div class="loading"></div>';
        
        try {
            const response = await fetch('/api/ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idea })
            });

            const data = await response.json();

            if (response.ok) {
                // Display the response
                responseTitle.textContent = "I understand!";
                responseMessage.textContent = `I can help you bring "${idea}" to life. We can shape this together.`;
                
                // Show next steps
                nextSteps.innerHTML = `
                    <button onclick="location.reload()">Try Another Idea</button>
                    <button onclick="continueIdea('${encodeURIComponent(idea)}')">Continue With This</button>
                `;
                
                responseContainer.classList.remove('hidden');
            } else {
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting idea:', error);
            alert('Sorry, there was an issue processing your idea. Please try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Create It';
        }
    }

    // Function to continue with the idea (would normally connect to the next step in the process)
    window.continueIdea = function(idea) {
        // In the full experience, we would guide the user to the next step
        // For now, we'll just show a friendly message
        responseTitle.textContent = "Great! Let's shape this together.";
        responseMessage.textContent = `We can now explore "${decodeURIComponent(idea)}" in more detail and start bringing it to life step by step.`;
        
        nextSteps.innerHTML = `
            <button onclick="location.reload()">Try Another Idea</button>
        `;
    };
    
    // Handle the Enter key for submission in the idea input
    ideaInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent the default action to avoid line breaks
            submitIdea();
        }
    });
});