document.addEventListener('DOMContentLoaded', () => {
    // Shared dark theme options for Chart.js
    Chart.defaults.color = '#a0aec0';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    // --- 1. SALES OVERVIEW (Line Chart) ---
    const salesCtx = document.getElementById('salesChart').getContext('2d');

    // Create gradient for lines
    const gradient1 = salesCtx.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, 'rgba(0, 117, 255, 0.4)');
    gradient1.addColorStop(1, 'rgba(0, 117, 255, 0.0)');

    const gradient2 = salesCtx.createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, 'rgba(44, 217, 255, 0.4)');
    gradient2.addColorStop(1, 'rgba(44, 217, 255, 0.0)');

    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Sales 1',
                    data: [400, 200, 300, 350, 450, 400, 450, 350, 300, 400, 450, 400],
                    borderColor: '#0075ff',
                    backgroundColor: gradient1,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4, // Curved lines
                    pointRadius: 0,
                    pointHoverRadius: 5
                },
                {
                    label: 'Sales 2',
                    data: [350, 150, 250, 300, 300, 350, 300, 250, 200, 250, 300, 250],
                    borderColor: '#2cd9ff',
                    backgroundColor: gradient2,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart',
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#121828',
                    titleColor: '#fff',
                    bodyColor: '#a0aec0',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: true,
                    boxPadding: 4,
                    usePointStyle: true,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 500,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false,
                    },
                    ticks: { padding: 10 }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: { padding: 10 }
                }
            }
        }
    });

    // --- 2. ACTIVE USERS (Bar Chart) ---
    const usersCtx = document.getElementById('usersChart').getContext('2d');

    new Chart(usersCtx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Users',
                data: [300, 200, 100, 400, 500, 350, 450, 250, 150],
                backgroundColor: '#ffffff',
                borderRadius: 4,
                barThickness: 6,
                maxBarThickness: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeOutBounce',
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default') {
                        delay = context.dataIndex * 100 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#121828',
                    titleColor: '#fff',
                    bodyColor: '#a0aec0',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 500,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false,
                        borderDash: [5, 5] // Dashed lines for bar chart grid
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        padding: 10,
                        stepSize: 100
                    }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: { display: false } // Hide x labels to match design exactly
                }
            }
        }
    });

    // --- 3. INITIAL LOAD ANIMATIONS ---
    const elementsToAnimate = document.querySelectorAll('.metric-card, .widget-card, .chart-wrapper');

    elementsToAnimate.forEach((el, index) => {
        // Add base class for properties but start hidden
        el.classList.add('fade-in-up');
        // Stagger the reveal 
        setTimeout(() => {
            el.classList.add('visible');
        }, 80 * index);
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((el, index) => {
        // Timeline items fade in from left
        setTimeout(() => {
            el.classList.add('visible');
        }, 500 + (100 * index));
    });

    // --- 4. CIRCULAR PROGRESS ANIMATIONS ---
    const circularProgresses = document.querySelectorAll('.circular-progress');

    circularProgresses.forEach(progress => {
        const targetValue = parseInt(progress.getAttribute('data-val'));
        let startValue = 0;
        let speed = 20; // ms per increment

        // Use a short delay before starting the circle animation for better visual flow
        setTimeout(() => {
            let progressInterval = setInterval(() => {
                startValue++;

                // Set the CSS variable --val dynamically
                progress.style.setProperty('--val', startValue);

                if (startValue === targetValue) {
                    clearInterval(progressInterval);
                }
            }, speed);
        }, 800); // starts after initial cards fade in
    });
});
