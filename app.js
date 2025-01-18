class Questionnaire {
    constructor() {
        this.answers = {};
        this.currentQuestion = 0;
        this.participantName = '';
        this.init();
    }

    init() {
        document.getElementById('start-questionnaire').addEventListener('click', () => this.startQuestionnaire());
        document.getElementById('submit').addEventListener('click', () => this.showResults());
        document.getElementById('csv-input').addEventListener('change', (e) => this.handleCSVUpload(e));
        
        // Add keyboard event listener
        document.addEventListener('keypress', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(event) {
        // Only handle number keys if questions are visible
        if (document.getElementById('questions').style.display === 'block') {
            const key = event.key;
            // Check if the pressed key is a number between 1 and 7
            if (/^[1-7]$/.test(key)) {
                const currentQuestionDiv = document.querySelector('.question');
                if (currentQuestionDiv) {
                    const button = currentQuestionDiv.querySelector(`[data-value="${key}"]`);
                    if (button) {
                        button.click();
                    }
                }
            }
        }
    }

    async handleCSVUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            const lines = text.split('\n').map(line => line.trim()).filter(line => line);
            
            // Check if the first line contains the participant name
            if (lines[0].startsWith('Participant Name,')) {
                const name = lines[0].split(',')[1];
                document.getElementById('participant-name').value = name;
            }

            // Skip header lines and empty lines
            const dataLines = lines.filter(line => 
                line && 
                !line.startsWith('Participant Name,') && 
                !line.startsWith('Question ID,')
            );

            // Process each line
            dataLines.forEach(line => {
                const [questionId, answer] = line.split(',');
                const parsedAnswer = parseInt(answer);
                if (!isNaN(parsedAnswer)) {
                    this.answers[parseInt(questionId)] = parsedAnswer;
                }
            });

            alert('CSV file loaded successfully. Previous answers will be pre-filled when available.');
        } catch (error) {
            console.error('Error reading CSV file:', error);
            alert('Error reading CSV file. Please make sure it\'s in the correct format.');
        }
    }

    startQuestionnaire() {
        const nameInput = document.getElementById('participant-name');
        if (!nameInput.value.trim()) {
            alert('Please enter your name before starting.');
            return;
        }

        this.participantName = nameInput.value.trim();
        document.getElementById('name-input-container').style.display = 'none';
        document.getElementById('questions').style.display = 'block';
        this.renderQuestion();
    }

    renderQuestion() {
        const container = document.getElementById('questions');
        const question = questions[this.currentQuestion];
        
        // Get the previously selected value for this question
        const previousAnswer = this.getPreviousAnswer(question);
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${question.text}</p>
            <div class="scale">
                <div class="scale-item">
                    <span class="scale-label">Ne me décrit pas du tout</span>
                    <button class="scale-button ${previousAnswer === 1 ? 'selected' : ''}" 
                            data-value="1">1</button>
                </div>
                ${Array.from({length: 5}, (_, i) => i + 2)
                    .map(num => {
                        const isSelected = previousAnswer === num;
                        return `
                            <div class="scale-item">
                                <button class="scale-button ${isSelected ? 'selected' : ''}" 
                                        data-value="${num}">${num}</button>
                            </div>`;
                    })
                    .join('')}
                <div class="scale-item">
                    <button class="scale-button ${previousAnswer === 7 ? 'selected' : ''}" 
                            data-value="7">7</button>
                    <span class="scale-label">Me décrit parfaitement</span>
                </div>
            </div>
            <div class="navigation-buttons">
                ${this.currentQuestion > 0 ? '<button class="nav-button" id="prev-button">Previous</button>' : ''}
                ${this.currentQuestion < questions.length - 1 ? 
                    `<button class="nav-button" id="next-button" ${!previousAnswer ? 'disabled' : ''}>Next</button>` : ''}
                <span class="question-counter">Question ${this.currentQuestion + 1} of ${questions.length}</span>
            </div>
        `;

        // Add event listeners for scale buttons
        questionDiv.querySelectorAll('.scale-button').forEach(button => {
            button.addEventListener('click', () => {
                // Remove previous selection
                questionDiv.querySelectorAll('.scale-button').forEach(btn => btn.classList.remove('selected'));
                // Add selection to clicked button
                button.classList.add('selected');
                this.handleAnswer(question, parseInt(button.dataset.value));
            });
        });

        // Add event listener for previous button
        const prevButton = questionDiv.querySelector('#prev-button');
        if (prevButton) {
            prevButton.addEventListener('click', () => this.goToPreviousQuestion());
        }

        // Add event listener for next button
        const nextButton = questionDiv.querySelector('#next-button');
        if (nextButton) {
            nextButton.addEventListener('click', () => this.goToNextQuestion());
        }

        container.innerHTML = '';
        container.appendChild(questionDiv);
    }

    getPreviousAnswer(question) {
        return this.answers[question.id] || null;
    }

    goToNextQuestion() {
        // Check if there's an answer for the current question
        const currentQuestion = questions[this.currentQuestion];
        const hasAnswer = this.getPreviousAnswer(currentQuestion) !== null;
        
        if (!hasAnswer) {
            return; // Don't allow advancing if there's no answer
        }

        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.renderQuestion();
        } else if (this.currentQuestion === questions.length - 1) {
            document.getElementById('submit').style.display = 'block';
        }
    }

    handleAnswer(question, value) {
        // Store answer by question ID instead of group
        if (!this.answers[question.id]) {
            this.answers[question.id] = value;
        }

        // Show the next button
        const questionDiv = document.querySelector('.question');
        const navigationButtons = questionDiv.querySelector('.navigation-buttons');
        
        if (!navigationButtons.querySelector('#next-button')) {
            const nextButton = document.createElement('button');
            nextButton.id = 'next-button';
            nextButton.className = 'nav-button';
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => this.goToNextQuestion());
            
            navigationButtons.insertBefore(nextButton, navigationButtons.lastElementChild);
        }

        // Automatically advance to next question after a brief delay
        setTimeout(() => {
            if (this.currentQuestion < questions.length - 1) {
                this.currentQuestion++;
                this.renderQuestion();
            } else if (this.currentQuestion === questions.length - 1) {
                document.getElementById('submit').style.display = 'block';
            }
        }, 200);
    }

    getAnswerForQuestion(questionId) {
        return this.answers[questionId] || null;
    }

    goToPreviousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderQuestion();
            // Hide submit button when going back
            document.getElementById('submit').style.display = 'none';
        }
    }

    calculateGroupAverages() {
        const averages = {};
        for (const group in groupQuestions) {
            const groupQuestionIds = groupQuestions[group];
            let sum = 0;
            let count = 0;
            
            groupQuestionIds.forEach(questionId => {
                const question = questionsList.find(q => q.id === questionId);
                const answer = this.getAnswerForQuestion(questionId);
                if (answer !== null) {
                    sum += answer;
                    count++;
                }
            });
            
            averages[group] = count > 0 ? sum / count : 0;
        }
        return averages;
    }

    showResults() {
        // Check for unanswered questions
        const unansweredQuestions = questions.filter(question => 
            this.getAnswerForQuestion(question.id) === null
        );

        if (unansweredQuestions.length > 0) {
            alert(`Veuillez répondre à toutes les questions avant de soumettre.\nQuestions non répondues: ${unansweredQuestions.map(q => q.id).join(', ')}`);
            return;
        }

        const averages = this.calculateGroupAverages();
        document.getElementById('questionnaire-container').style.display = 'none';
        document.getElementById('results-container').style.display = 'block';

        // Add thank you message above charts
        const thanksDiv = document.createElement('div');
        thanksDiv.className = 'results-thank-you';
        thanksDiv.innerHTML = '<h2>Merci pour votre participation!</h2><p>Vos résultats ont été envoyés automatiquement.</p>';
        document.querySelector('.graphs-grid').insertAdjacentElement('beforebegin', thanksDiv);

        // Create pairs of groups
        for (let i = 0; i < 7; i++) {
            const group1 = `group${i * 2 + 2}`;
            const group2 = `group${i * 2 + 1}`;
            
            this.createScatterPlot(
                `graph${i + 1}`,
                averages[group1],
                averages[group2],
                `Group ${i * 2 + 2} vs \n Group ${i * 2 + 1}`
            );
        }

        // Display answers list
        this.displayAnswersList();

        // Add event listeners for export buttons
        document.getElementById('download-csv').addEventListener('click', () => this.downloadCSV());
        document.getElementById('export-pdf').addEventListener('click', () => this.exportToPDF());

        // Automatically trigger email send
        this.sendResultsByEmail();
    }

    displayAnswersList() {
        const answersList = document.getElementById('answers-list');
        let answersText = `Participant Name: ${this.participantName}\n\n`;
        
        questions.forEach((question, index) => {
            const answer = this.getPreviousAnswer(question);
            answersText += `${answer}: ${question.text}\n`;
        });
        
        answersList.textContent = answersText;
    }

    downloadCSV() {
        let csvContent = `Participant Name,${this.participantName}\n\n`;
        csvContent += 'Question ID,Answer,Question,Groups\n';
        
        questions.forEach((question) => {
            const answer = this.getPreviousAnswer(question);
            csvContent += `${question.id},${answer},"${question.text}","${question.groups.join(';')}"\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `questionnaire_answers_${this.participantName}.csv`;
        link.click();
    }

    exportToPDF() {
        // Using window.print() as a simple solution
        // You might want to use a proper PDF library for more control
        window.print();
    }

    createScatterPlot(elementId, x, y, title) {
        const groupNumber = parseInt(elementId.slice(-1));
        const group1 = `group${groupNumber * 2 }`;
        const group2 = `group${groupNumber * 2 -1}`;
        
        // Get group labels
        const group1Label = groupLabels[group1] || group1;
        const group2Label = groupLabels[group2] || group2;

        // Original scatter point
        const pointTrace = {
            x: [x],
            y: [y],
            mode: 'markers',
            type: 'scatter',
            marker: { size: 12 },
            name: 'Score'
        };

        // Identity line (diagonal)
        const identityLine = {
            x: [1, 7],
            y: [1, 7],
            mode: 'lines',
            type: 'scatter',
            line: {
                color: 'gray',
                dash: 'dash'
            },
            name: 'Identity Line'
        };

        // Vertical line at x
        const verticalLine = {
            x: [x, x],
            y: [1, y],
            mode: 'lines',
            type: 'scatter',
            line: {
                color: 'lightblue',
                dash: 'dot'
            },
            name: 'X Reference'
        };

        // Horizontal line at y
        const horizontalLine = {
            x: [1, x],
            y: [y, y],
            mode: 'lines',
            type: 'scatter',
            line: {
                color: 'lightblue',
                dash: 'dot'
            },
            name: 'Y Reference'
        };

        const layout = {
            title: `${group1Label} vs \n ${group2Label}`,
            xaxis: { 
                range: [1, 7], 
                title: group1Label
            },
            yaxis: { 
                range: [1, 7], 
                title: group2Label
            },
            showlegend: false
        };

        Plotly.newPlot(elementId, [identityLine, verticalLine, horizontalLine, pointTrace], layout);
    }

    sendResultsByEmail() {
        // Show loading overlay
        const loadingOverlay = document.querySelector('.loading-overlay');
        loadingOverlay.style.display = 'flex';

        // Prepare the form data
        const emailForm = document.getElementById('email-form');
        
        // Set the name
        document.getElementById('email-name').value = this.participantName;
        
        // Set the date
        const currentDate = new Date().toISOString().split('T')[0];
        document.getElementById('email-date').value = currentDate;
        
        // Prepare the results text
        let resultsText = `Results for ${this.participantName}\n`;
        resultsText += `Date: ${currentDate}\n\n`;
        
        // Add answers
        questions.forEach((question) => {
            const answer = this.getPreviousAnswer(question);
            resultsText += `Q${question.id}: ${answer}\n`;
        });
        
        // Add group averages
        const averages = this.calculateGroupAverages();
        resultsText += '\nGroup Averages:\n';
        for (const [group, average] of Object.entries(averages)) {
            resultsText += `${groupLabels[group] || group}: ${average.toFixed(2)}\n`;
            
            // Set individual group average fields - only numerical value
            const groupField = document.getElementById(`email-${group}`);
            if (groupField) {
                groupField.value = average.toFixed(2);
            }
        }
        
        // Set the results in the hidden textarea
        document.getElementById('email-resultats').value = resultsText;
        
        // Submit the form using fetch
        const formData = new FormData(emailForm);
        fetch(emailForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
        })
        .catch(error => {
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
            
            console.error('Error:', error);
            alert('Une erreur est survenue lors de l\'envoi des résultats. Veuillez réessayer.');
        });
    }

    restartQuestionnaire() {
        // Reset all state
        this.answers = {};
        this.currentQuestion = 0;
        this.participantName = '';

        // Reset UI
        document.getElementById('thank-you-message').style.display = 'none';
        document.getElementById('results-container').style.display = 'none';
        document.getElementById('questionnaire-container').style.display = 'block';
        document.getElementById('name-input-container').style.display = 'block';
        document.getElementById('questions').style.display = 'none';
        document.getElementById('participant-name').value = '';
        document.getElementById('submit').style.display = 'none';
    }
}

// Initialize the questionnaire
new Questionnaire(); 